import numpy as np
import matplotlib.pyplot as plt
from deap import base, creator, tools, algorithms
import random
from collections import deque
import math

def get_rectangular_layout():
    """Create a rectangular hall layout filled with walkable areas (1s)"""
    while True:
        try:
            cols = int(input("Enter hall width (number of columns, min 5): "))
            rows = int(input("Enter hall height (number of rows, min 5): "))
            if cols < 5 or rows < 5:
                print("Minimum size is 5x5")
                continue
            break
        except ValueError:
            print("Please enter integers only")
    
    # Create a full 1s array with optional walls if needed
    return np.ones((rows, cols), dtype=int)

# =====================
# 1. Venue Configuration
# =====================
HALL_LAYOUT = get_rectangular_layout()

SEATING_STYLES = {
    0: {'name': 'Theater', 'color': 'blue', 'params': {'aisle': 1.2, 'row_space': 0.9}},
    1: {'name': 'Classroom', 'color': 'green', 'params': {'cluster_size': 4, 'min_group': 4}},
    2: {'name': 'Banquet', 'color': 'red', 'params': {'table_size': 8, 'table_space': 2.0}}
}

TOTAL_ATTENDEES = 50
GRID_SIZE = 0.5  # meters per grid cell
MAX_GENERATIONS = 150
POPULATION_SIZE = 100

# =====================
# 2. Genetic Algorithm Setup
# =====================
creator.create("FitnessMulti", base.Fitness, weights=(1.0, 1.0, 1.0))
creator.create("Individual", list, fitness=creator.FitnessMulti)

toolbox = base.Toolbox()

def create_individual():
    style = random.choice(list(SEATING_STYLES.keys()))
    seats = [1 if random.random() < 0.7 else 0 for _ in range(len(VALID_POSITIONS))]
    return [style] + seats

toolbox.register("individual", tools.initIterate, creator.Individual, create_individual)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

# =====================
# 3. Evaluation Functions
# =====================
def evaluate(individual):
    style = individual[0]
    seats = individual[1:]
    grid = np.zeros_like(HALL_LAYOUT)

    for idx, val in enumerate(seats):
        if val == 1:
            r, c = VALID_POSITIONS[idx]
            grid[r, c] = 1

    capacity = int(np.sum(grid))
    style_score = 0
    safety = safety_factor(grid)

    try:
        if style == 0:
            style_score = theater_score(grid, SEATING_STYLES[style]['params'])
        elif style == 1:
            style_score = classroom_score(grid, SEATING_STYLES[style]['params'])
        elif style == 2:
            style_score = banquet_score(grid, SEATING_STYLES[style]['params'])
    except:
        style_score = 0

    penalty = abs(capacity - TOTAL_ATTENDEES)
    return capacity, style_score - penalty, safety

def theater_score(grid, params):
    score = 0
    seat_coords = np.argwhere(grid == 1)
    col_counts = np.sum(grid, axis=0)

    min_aisle_width = params['aisle'] / GRID_SIZE
    central_aisle = HALL_LAYOUT.shape[1] // 2
    aisle_space = col_counts[central_aisle-1:central_aisle+2].sum()
    if aisle_space >= min_aisle_width:
        score += 50

    rows = sorted(list(set(seat_coords[:, 0])))
    for i in range(1, len(rows)):
        if (rows[i] - rows[i-1]) * GRID_SIZE < params['row_space']:
            score -= 30

    return max(0, score + 100)

def classroom_score(grid, params):
    clusters = find_clusters(grid, params['cluster_size'])
    valid_clusters = [c for c in clusters if len(c) >= params['min_group']]
    return len(valid_clusters) * 50

def banquet_score(grid, params):
    tables = find_tables(
        grid, 
        params['table_size'], 
        math.ceil(params['table_space'] / GRID_SIZE)
    )
    return len(tables) * 60

# =====================
# 4. Helper Functions
# =====================
def find_clusters(grid, min_size):
    clusters = []
    visited = set()
    for r in range(grid.shape[0]):
        for c in range(grid.shape[1]):
            if grid[r, c] == 1 and (r, c) not in visited:
                cluster = []
                stack = [(r, c)]
                while stack:
                    x, y = stack.pop()
                    if 0 <= x < grid.shape[0] and 0 <= y < grid.shape[1]:
                        if grid[x, y] == 1 and (x, y) not in visited:
                            visited.add((x, y))
                            cluster.append((x, y))
                            stack.extend([(x+1, y), (x-1, y), (x, y+1), (x, y-1)])
                if len(cluster) >= min_size:
                    clusters.append(cluster)
    return clusters

def find_tables(grid, table_size, spacing):
    tables = []
    visited = set()

    for r in range(grid.shape[0]):
        c = 0
        while c < grid.shape[1] - table_size + 1:
            if all(grid[r, c+i] == 1 and (r, c+i) not in visited for i in range(table_size)):
                table = [(r, c+i) for i in range(table_size)]
                tables.append(table)
                visited.update(table)
                c += table_size + spacing
            else:
                c += 1
    return tables

def safety_factor(grid):
    exits = [(0, 5), (7, 5)]
    accessible = 0
    for exit in exits:
        if has_clear_path(grid, exit):
            accessible += 1
    return accessible / len(exits)

def has_clear_path(grid, exit):
    q = deque([exit])
    visited = set()

    while q:
        r, c = q.popleft()
        if grid[r, c] == 1:
            return True
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < grid.shape[0] and 0 <= nc < grid.shape[1]:
                if HALL_LAYOUT[nr, nc] == 1 and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    q.append((nr, nc))
    return False

# =====================
# 5. Evolutionary Algorithm
# =====================
toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)
toolbox.register("select", tools.selNSGA2)
toolbox.register("evaluate", evaluate)

def main():
    pop = toolbox.population(n=POPULATION_SIZE)
    hof = tools.ParetoFront()
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", np.mean, axis=0)
    stats.register("max", np.max, axis=0)

    pop, log = algorithms.eaSimple(
        pop, toolbox, cxpb=0.8, mutpb=0.2, ngen=MAX_GENERATIONS,
        stats=stats, halloffame=hof, verbose=True
    )

    for i, best in enumerate(hof):
        visualize_solution(best, i)

# =====================
# 6. Visualization
# =====================
def visualize_solution(individual, idx=0):
    grid = np.zeros_like(HALL_LAYOUT)
    for i, val in enumerate(individual[1:]):
        if val == 1:
            r, c = VALID_POSITIONS[i]
            grid[r, c] = 1

    plt.figure(figsize=(12, 8))
    plt.imshow(HALL_LAYOUT, cmap='Greys', alpha=0.3)
    seats = np.argwhere(grid == 1)
    style = SEATING_STYLES[individual[0]]
    plt.scatter(seats[:, 1], seats[:, 0], color=style['color'], s=100)
    plt.title(f"{style['name']} Layout - {len(seats)} Seats")
    plt.grid(False)
    plt.show()

if __name__ == "__main__":
    VALID_POSITIONS = [(r, c) for r in range(HALL_LAYOUT.shape[0]) 
                      for c in range(HALL_LAYOUT.shape[1]) if HALL_LAYOUT[r, c] == 1]
    if not VALID_POSITIONS:
        print("Error: No walkable areas in the hall layout!")
    else:
        main()