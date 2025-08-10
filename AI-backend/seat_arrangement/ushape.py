import os
os.environ['SDL_VIDEODRIVER'] = 'dummy'

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pygame, math
from io import BytesIO
from PIL import Image

# ─── CONFIGURATION ────────────────────────────────────────────────────────────
W, H           = 1000, 600
TABLE_W, TABLE_H = 600, 200
PAD             = 10
SEAT_W, SEAT_H  = 60, 40
FPS             = 60

app = Flask(__name__)
CORS(app)

# --- U-Shape capacity calculation ---
def compute_max_capacity_ushape():
    """Returns maximum number of seats that fit in a U-shape."""
    left_max   = int(TABLE_H // (SEAT_H + PAD))
    bottom_max = int(TABLE_W // (SEAT_W + PAD))
    return left_max * 2 + bottom_max

# --- U-Shape drawing logic ---
def draw_ushape(surface, total_seats):
    """Draws a U-shaped table layout with individual seats."""
    # Center table
    cx, cy    = W // 2, H // 2
    tbl_left  = cx - TABLE_W // 2
    tbl_top   = cy - TABLE_H // 2
    tbl_rect  = pygame.Rect(tbl_left, tbl_top, TABLE_W, TABLE_H)

    # Compute seat positions
    per_side = min(int(TABLE_H // (SEAT_H + PAD)), total_seats // 3)
    bottom   = total_seats - 2 * per_side

    positions = []
    # Left side
    if per_side > 0:
        spacing_y = TABLE_H / (per_side + 1)
        x = tbl_left - PAD - SEAT_W
        for i in range(1, per_side + 1):
            y = tbl_top + spacing_y * i - SEAT_H / 2
            positions.append((x, y))
    # Bottom side
    if bottom > 0:
        spacing_x = TABLE_W / (bottom + 1)
        y = tbl_top + TABLE_H + PAD
        for i in range(1, bottom + 1):
            x = tbl_left + spacing_x * i - SEAT_W / 2
            positions.append((x, y))
    # Right side
    if per_side > 0:
        spacing_y = TABLE_H / (per_side + 1)
        x = tbl_left + TABLE_W + PAD
        for i in range(1, per_side + 1):
            y = tbl_top + TABLE_H - spacing_y * i - SEAT_H / 2 + spacing_y
            positions.append((x, y))

    # Draw background & elements
    surface.fill((255, 255, 255))
    pygame.draw.rect(surface, (150, 150, 150), (0, 0, W, H), 4)   # border
    pygame.draw.rect(surface, (200, 200, 200), tbl_rect)         # table

    font = pygame.font.SysFont(None, 24)
    for idx, (x, y) in enumerate(positions, start=1):
        seat_rect = pygame.Rect(x, y, SEAT_W, SEAT_H)
        pygame.draw.rect(surface, (245, 200, 100), seat_rect)
        pygame.draw.rect(surface, (0, 0, 0), seat_rect, 2)
        num = font.render(str(idx), True, (0, 0, 0))
        surface.blit(
            num,
            (
                x + (SEAT_W - num.get_width()) / 2,
                y + (SEAT_H - num.get_height()) / 2
            )
        )

# --- Render to PNG helper ---
def render_png(seats):
    pygame.init()
    surface = pygame.Surface((W, H))
    draw_ushape(surface, seats)
    raw = pygame.image.tostring(surface, 'RGBA')
    img = Image.frombytes('RGBA', (W, H), raw).convert('RGB')
    buf = BytesIO()
    img.save(buf, 'PNG')
    buf.seek(0)
    return buf

