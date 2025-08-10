import numpy as np
import gymnasium as gym
from gymnasium import spaces
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from tkinter import Canvas
from PIL import Image, ImageTk
import tkinter as tk
import os

class SmartFloorPlanEnv(gym.Env):
    """
    Gym-style environment for heuristic stall placement.
    Auto-computes stall sizes, wall layer, and aisle width based on hall geometry and stall count,
    enforces a maximum stall limit derived from available space,
    with configurable minimum small-stall size.
    Greedy `auto_place()` fills large stalls first (walls then middle),
    then packs small stalls, respecting clearance zones.
    Render outputs a white canvas with black outlines.
    """
    metadata = {"render_modes": ["human"], "render_fps": 4}

    def _create_default_hall(self):
        hall = np.zeros((20, 20), dtype=np.uint8)
        hall[[0, -1], :] = 1
        hall[:, [0, -1]] = 1
        return hall

    def _create_layered_layout(self):
        # Scale aisle width based on hall size
        min_dim = min(self.height, self.width)
        self.aisle_width = max(1, int(min_dim * 0.07))   # 5% of smaller dimension

        self.wall_layer_mask = np.zeros_like(self.hall_layout, dtype=bool)
        self.aisle_layer_mask = np.zeros_like(self.hall_layout, dtype=bool)

        # Wall layer with thickness equal to large stall width
        self.wall_layer_mask[0:self.wall_thickness, :] = True
        self.wall_layer_mask[-self.wall_thickness:, :] = True
        self.wall_layer_mask[:, 0:self.wall_thickness] = True
        self.wall_layer_mask[:, -self.wall_thickness:] = True

        # Aisles adjacent to walls
        w = self.aisle_width
        self.aisle_layer_mask[self.wall_thickness:self.wall_thickness+w, self.wall_thickness:-self.wall_thickness] = True
        self.aisle_layer_mask[-(self.wall_thickness+w):-self.wall_thickness, self.wall_thickness:-self.wall_thickness] = True
        self.aisle_layer_mask[self.wall_thickness+w:-self.wall_thickness-w, self.wall_thickness:self.wall_thickness+w] = True
        self.aisle_layer_mask[self.wall_thickness+w:-self.wall_thickness-w, -(self.wall_thickness+w):-self.wall_thickness] = True

        # Middle zone mask
        self.middle_layer_mask = (
            (self.hall_layout == 0)
            & ~self.wall_layer_mask
            & ~self.aisle_layer_mask
        )

    def __init__(
        self,
        hall_layout=None,
        total_stalls=None,
        entry=(0, 0),
        exit=(0, 0),
        clearance=1,
        min_small_size=2,
        render_mode="human"
    ):
        super().__init__()
        self.render_mode = render_mode
        self.entry = entry
        self.exit = exit
        self.clearance = clearance
        self.min_small_size = min_small_size

        # Initialize hall
        self.hall_layout = self._create_default_hall() if hall_layout is None else hall_layout
        self.height, self.width = self.hall_layout.shape

        # Compute free capacity and stall sizes first
        free_middle = np.sum((self.hall_layout == 0))  # Initial estimate before masks
        free_wall = 0  # Will be updated after masks
        total_free = free_middle

        # Derive stall size areas, scaled to hall size
        min_dim = min(self.height, self.width)
        base_stall_size = max(self.min_small_size, int(min_dim * 0.1))  # Base stall size is 10% of smaller dimension
        small_area = max(1, int(free_middle / (1.5 * (total_stalls or 1))))
        large_area = max(1, int((2.0 * free_middle) / (total_stalls or 1)))  # Initial estimate
        small_dim = max(self.min_small_size, int(np.sqrt(small_area)), base_stall_size)
        large_dim = max(1, int(np.sqrt(large_area)), base_stall_size * 2)  # Large stalls are at least 2x base size
        self.stall_sizes = [(small_dim, small_dim), (large_dim, large_dim)]
        self.wall_thickness = large_dim  # Set wall thickness equal to large stall width

        # Create layered layout with calculated wall thickness
        self._create_layered_layout()

        # Recalculate free capacity with masks
        free_middle = np.sum(self.middle_layer_mask & (self.hall_layout == 0))
        free_wall = np.sum(self.wall_layer_mask & (self.hall_layout == 0))
        total_free = free_middle + free_wall

        # Adjust stall sizes based on actual free space
        small_area = max(1, int(free_middle / (1.5 * (total_stalls or 1))))
        large_area = max(1, int((free_wall) / (total_stalls or 1)))
        small_dim = max(self.min_small_size, int(np.sqrt(small_area)), base_stall_size)
        large_dim = max(1, int(np.sqrt(large_area)), base_stall_size * 2)
        self.stall_sizes = [(small_dim, small_dim), (large_dim, large_dim)]
        self.wall_thickness = large_dim  # Ensure consistency

        # Determine maximum stalls that can fit
        max_stalls = total_free // (small_dim * small_dim)
        if total_stalls is None:
            self.total_stalls = max_stalls
        else:
            self.total_stalls = min(total_stalls, max_stalls)

        # Build clearance mask around entry/exit
        self.clearance_mask = np.zeros_like(self.hall_layout, dtype=bool)
        for px, py in (self.entry, self.exit):
            for dx in range(-self.clearance, self.clearance + 1):
                for dy in range(-self.clearance, self.clearance + 1):
                    x0, y0 = px + dx, py + dy
                    if 0 <= x0 < self.width and 0 <= y0 < self.height:
                        self.clearance_mask[y0, x0] = True

        # Bookkeeping
        self.stall_placed = 0
        self.grid = np.zeros_like(self.hall_layout)
        self.stall_rects = []

        # Observation & action spaces
        self.observation_space = spaces.Dict({
            "layout": spaces.Box(0, 1, shape=self.hall_layout.shape, dtype=np.uint8),
            "stalls": spaces.Box(0, 1, shape=self.hall_layout.shape, dtype=np.uint8),
            "remaining": spaces.Box(0, self.total_stalls, shape=(1,), dtype=np.int32)
        })
        self.action_space = spaces.Dict({
            "position": spaces.Box(
                low=np.array([0, 0]), high=np.array([self.width - 1, self.height - 1]), dtype=np.int32
            ),
            "orientation": spaces.Discrete(2),
            "size": spaces.Discrete(2)
        })

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.grid.fill(0)
        self.stall_placed = 0
        self.stall_rects.clear()
        return self._get_obs(), {}

    def _get_obs(self):
        return {
            "layout": self.hall_layout,
            "stalls": self.grid,
            "remaining": np.array([self.total_stalls - self.stall_placed], dtype=np.int32)
        }

    def _valid_placement(self, x, y, w, h, size_id):
        if x + w > self.width or y + h > self.height:
            return False
        if np.any(self.hall_layout[y:y+h, x:x+w] > 0):
            return False
        if np.any(self.grid[y:y+h, x:x+w]):
            return False
        if np.any(self.aisle_layer_mask[y:y+h, x:x+w]):
            return False
        if np.any(self.clearance_mask[y:y+h, x:x+w]):
            return False

        if size_id == 0:
            return (
                np.any(self.middle_layer_mask[y:y+h, x:x+w])
                and not np.any(self.wall_layer_mask[y:y+h, x:x+w])
            )
        else:
            region_wall = self.wall_layer_mask[y:y+h, x:x+w]
            region_mid = self.middle_layer_mask[y:y+h, x:x+w]
            return ((region_wall.any() and not region_mid.any())
                    or (region_mid.any() and not region_wall.any()))

    def step(self, action):
        x, y = action["position"]
        orient = int(action["orientation"])
        size_id = int(action["size"])
        w0, h0 = self.stall_sizes[size_id]
        w, h = (h0, w0) if orient else (w0, h0)
        reward = -1
        if self._valid_placement(x, y, w, h, size_id):
            self.grid[y:y+h, x:x+w] = 1
            self.stall_placed += 1
            self.stall_rects.append({"id": self.stall_placed, "x": x, "y": y, "w": w, "h": h})
            reward = 1
        done = self.stall_placed >= self.total_stalls
        return self._get_obs(), reward, done, False, {}

    def auto_place(self):
        for size_id in [1, 0]:  # Place large stalls first (size_id 1), then small (size_id 0)
            w0, h0 = self.stall_sizes[size_id]
            placed_any = True
            while placed_any and self.stall_placed < self.total_stalls:
                placed_any = False
                for y in range(self.height):
                    for x in range(self.width):
                        for orient in (0, 1):
                            w, h = (h0, w0) if orient else (w0, h0)
                            if self._valid_placement(x, y, w, h, size_id):
                                self.grid[y:y+h, x:x+w] = 1
                                self.stall_placed += 1
                                self.stall_rects.append({"id": self.stall_placed, "x": x, "y": y, "w": w, "h": h})
                                placed_any = True
                                break
                        if placed_any:
                            break
                    if placed_any:
                        break

    def render(self, draw_stalls=True):
        dpi = 100
        fig, ax = plt.subplots(
            figsize=(self.width/dpi, self.height/dpi), 
            dpi=dpi
        )
        ax.set_aspect("equal")
        # Draw hall boundary
        ax.add_patch(patches.Rectangle((0, 0), self.width, self.height, linewidth=2, edgecolor="black", facecolor="none"))
        if draw_stalls:
            for rect in self.stall_rects:
                ax.add_patch(patches.Rectangle((rect["x"], rect["y"]), rect["w"], rect["h"], linewidth=1.2, edgecolor="black", facecolor="white"))
        ax.set_xlim(0, self.width)
        ax.set_ylim(self.height, 0)
        ax.axis("off")
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
        plt.tight_layout(pad=0)
        return fig

class DragDropApp(tk.Tk):
    def __init__(self, hall_width, hall_height, stall_rects, scale=60):
        super().__init__()
        self.title("Drag and Drop Stalls")
        self.scale = scale
        canvas_width = hall_width * scale
        canvas_height = hall_height * scale
        self.canvas = Canvas(self, width=canvas_width, height=canvas_height, bg="white")
        self.canvas.pack()
        # Draw hall boundary
        self.canvas.create_rectangle(
            0, 0, canvas_width, canvas_height,
            outline="black", width=2
        )
        
        self.stall_rects = stall_rects
        self.stall_ids = []
        for rect in stall_rects:
            x0 = rect["x"] * scale
            y0 = rect["y"] * scale
            x1 = x0 + rect["w"] * scale
            y1 = y0 + rect["h"] * scale
            id = self.canvas.create_rectangle(
                x0, y0, x1, y1,
                outline="black", width=1.2, fill="white"
            )
            self.stall_ids.append(id)
        # Bind drag events
        self.drag_data = {"id": None, "dx": 0, "dy": 0}
        self.canvas.bind("<Button-1>", self.on_click)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)

    def on_click(self, event):
        # Find the topmost rectangle under the cursor
        items = self.canvas.find_overlapping(event.x, event.y, event.x, event.y)
        for item in items[::-1]:  # Reverse order: topmost first
            if item in self.stall_ids:
                self.drag_data["id"] = item
                x0, y0, _, _ = self.canvas.coords(item)
                self.drag_data["dx"] = event.x - x0
                self.drag_data["dy"] = event.y - y0
                break

    def on_drag(self, event):
        if self.drag_data["id"]:
            # Update rectangle position
            coords = self.canvas.coords(self.drag_data["id"])
            if len(coords) == 4:
                x0, y0, x1, y1 = coords
                w = x1 - x0
                h = y1 - y0
                new_x0 = max(0, min(event.x - self.drag_data["dx"], self.canvas.winfo_width() - w))
                new_y0 = max(0, min(event.y - self.drag_data["dy"], self.canvas.winfo_height() - h))
                new_x1 = new_x0 + w
                new_y1 = new_y0 + h
                self.canvas.coords(self.drag_data["id"], new_x0, new_y0, new_x1, new_y1)
                # Update corresponding stall_rects entry
                index = self.stall_ids.index(self.drag_data["id"])
                self.stall_rects[index]["x"] = new_x0
                self.stall_rects[index]["y"] = new_y0

    def on_release(self, event):
        self.drag_data["id"] = None
        # Save canvas as image
        self.save_canvas_as_image()

    def save_canvas_as_image(self):
        file_path = "auto_floorplan_updated.png"
        ps_file = file_path + ".ps"
        self.canvas.postscript(file=ps_file, colormode='color')
        img = Image.open(ps_file)
        img.save(file_path)
        img.close()
        os.remove(ps_file)
        print(f"Auto-saved: {file_path}")

if __name__ == "__main__":
    dims = input("Enter hall dimensions as rows cols: ").split()
    if len(dims) != 2:
        print("Invalid input. Expected two integers.")
        exit()
    floor_h, floor_w = map(int, dims)
    hall = np.zeros((floor_h, floor_w), dtype=np.uint8)
    hall[[0, -1], :] = 1
    hall[:, [0, -1]] = 1

    # Set entry/exit at middle of left/right walls
    entry = (0, floor_h // 2)
    exit = (floor_w - 1, floor_h // 2)

    # Get total stalls or auto-calc
    try:
        total = int(input("Enter total number of stalls to place (or press Enter to auto-calc): "))
    except Exception:
        total = None

    env = SmartFloorPlanEnv(
        hall_layout=hall,
        total_stalls=total,
        entry=entry,
        exit=exit,
        clearance=1,
        min_small_size=2
    )
    env.reset()
    env.auto_place()
    
    # Save floor plan with stalls
    fig_full = env.render(draw_stalls=True)
    fig_full.savefig("auto_floorplan.png")
    plt.close(fig_full)

    # Start Tkinter application with direct dimensions
    app = DragDropApp(floor_w, floor_h, env.stall_rects, scale=20)
    app.mainloop()