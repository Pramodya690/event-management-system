import os
os.environ['SDL_VIDEODRIVER'] = 'dummy'

import pygame, math, random
from flask import Flask, request, send_file, jsonify
from io import BytesIO
from PIL import Image
from flask_cors import CORS 

# ─── CONFIGURATION ────────────────────────────────────────────────────────────
FPS               = 60
WINDOW_W, WINDOW_H= 1200, 900
MARGIN            = 50
TABLE_RADIUS      = 50
SEAT_RADIUS       = 8
SEATS_PER_TABLE   = 8
PATH_WIDTH        = 200
STAGE_H           = 60

app = Flask(__name__)
CORS(app) 

# --- Capacity & spacing calculations ---
def estimate_capacity(min_sep, hall_w, top_limit, bottom_limit):
    left_x   = MARGIN + TABLE_RADIUS + 10
    right_x  = MARGIN + hall_w - TABLE_RADIUS - 10
    path_l   = MARGIN + (hall_w - PATH_WIDTH) / 2
    path_r   = path_l + PATH_WIDTH

    w_left   = path_l - left_x
    w_right  = right_x - path_r
    cols_l   = max(0, int(w_left  // min_sep))
    cols_r   = max(0, int(w_right // min_sep))
    rows     = max(0, int((bottom_limit - top_limit) // min_sep))
    tables   = (cols_l + cols_r) * rows
    return tables * SEATS_PER_TABLE


def compute_max_capacity():
    hall_w      = WINDOW_W  - 2 * MARGIN
    hall_h      = WINDOW_H  - 2 * MARGIN
    top_limit   = MARGIN + 10 + STAGE_H + 20
    bottom_limit= MARGIN + hall_h - TABLE_RADIUS - 10
    fixed_sep   = 2 * TABLE_RADIUS + 10
    return estimate_capacity(fixed_sep, hall_w, top_limit, bottom_limit)


def compute_dynamic_sep(tables_needed, hall_w, top_limit, bottom_limit):
    area = (bottom_limit - top_limit) * hall_w
    cell = math.sqrt(max(1, area / tables_needed))
    return max(2 * TABLE_RADIUS + 10, cell * 0.8)

# --- Drawing routine ---
def draw_layout(surface, total_seats):
    hall_w = WINDOW_W - 2 * MARGIN
    hall_h = WINDOW_H - 2 * MARGIN
    surface.fill((255, 255, 255))

    # Draw border
    pygame.draw.rect(surface, (150, 150, 150),
                     (MARGIN, MARGIN, hall_w, hall_h), 5)
    # Draw stage
    sx = MARGIN + (hall_w - hall_w * 0.5) / 2
    sy = MARGIN + 10
    pygame.draw.rect(surface, (200, 200, 200),
                     (sx, sy, hall_w * 0.5, STAGE_H))
    # Draw aisle
    top_l    = sy + STAGE_H + 20
    bottom_l = MARGIN + hall_h - TABLE_RADIUS - 10
    path_l   = MARGIN + (hall_w - PATH_WIDTH) / 2
    pygame.draw.rect(surface, (220, 220, 220),
                     (path_l, top_l, PATH_WIDTH, bottom_l - top_l))

    # Place tables randomly
    tables_needed = math.ceil(total_seats / SEATS_PER_TABLE)
    min_sep       = compute_dynamic_sep(tables_needed, hall_w, top_l, bottom_l)
    placed = []
    attempts = 0
    MAX_ATTEMPTS = tables_needed * 30
    left_x  = MARGIN + TABLE_RADIUS + 10
    right_x = MARGIN + hall_w - TABLE_RADIUS - 10

    while len(placed) < tables_needed and attempts < MAX_ATTEMPTS:
        attempts += 1
        x = random.uniform(left_x, right_x)
        y = random.uniform(top_l, bottom_l)

        # avoid stage
        if y - TABLE_RADIUS < sy + STAGE_H:
            continue
        # avoid aisle
        if not (x + TABLE_RADIUS <= path_l or x - TABLE_RADIUS >= path_l + PATH_WIDTH):
            continue
        # respect spacing
        if any(math.hypot(px - x, py - y) < min_sep for px, py in placed):
            continue

        placed.append((x, y))

    # Draw tables + seats
    for x, y in placed:
        pygame.draw.circle(surface, (0, 255, 0), (int(x), int(y)), TABLE_RADIUS, 2)
        for i in range(SEATS_PER_TABLE):
            ang = 2 * math.pi * i / SEATS_PER_TABLE
            sx_ = x + (TABLE_RADIUS - SEAT_RADIUS) * math.cos(ang)
            sy_ = y + (TABLE_RADIUS - SEAT_RADIUS) * math.sin(ang)
            pygame.draw.circle(surface, (0, 0, 0), (int(sx_), int(sy_)), SEAT_RADIUS)

# --- Generate image buffer with PIL ---
def generate_image_buffer(seats):
    pygame.init()
    surface = pygame.Surface((WINDOW_W, WINDOW_H))
    draw_layout(surface, seats)
    raw_str = pygame.image.tostring(surface, 'RGBA')
    img = Image.frombytes('RGBA', (WINDOW_W, WINDOW_H), raw_str)
    img = img.convert('RGB')
    buf = BytesIO()
    img.save(buf, 'PNG')
    buf.seek(0)
    return buf

