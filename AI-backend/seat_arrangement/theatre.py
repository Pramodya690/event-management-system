import os
os.environ['SDL_VIDEODRIVER'] = 'dummy'

from flask_cors import CORS
import pygame, math
from flask import Flask, request, jsonify, send_file
from io import BytesIO
from PIL import Image


# ─── COPY YOUR THEATER LAYOUT LOGIC ────────────────────────────────────────────
def compute_max_capacity():
    W, H        = 1000, 600
    MARGIN      = 50
    STAGE_H     = 60
    AISLE_W     = 100
    PAD         = 10
    MIN_SEAT_W, MIN_SEAT_H = 30, 20

    hall_w = W - 2*MARGIN
    hall_h = H - 2*MARGIN
    side_w  = (hall_w - AISLE_W) / 2
    avail_h = hall_h - STAGE_H - PAD

    per_side = max(1, int((side_w + PAD) // (MIN_SEAT_W + PAD)))
    rows     = max(1, int((avail_h + PAD) // (MIN_SEAT_H + PAD)))
    return per_side * 2 * rows

def draw_theater(surface, total_seats):
    W, H        = 1000, 600
    MARGIN      = 50
    STAGE_H     = 60
    AISLE_W     = 100
    PAD         = 10

    hall_w = W - 2*MARGIN
    hall_h = H - 2*MARGIN
    side_w  = (hall_w - AISLE_W) / 2
    avail_h = hall_h - STAGE_H - PAD

    # Find optimal grid & seat size
    best = None
    for rows in range(1, total_seats+1):
        cols = math.ceil(total_seats/rows)
        if cols % 2: cols += 1
        per_side = cols//2
        sw = (side_w - (per_side+1)*PAD)/per_side
        sh = (avail_h - (rows+1)*PAD)/rows
        if sw<=0 or sh<=0: continue
        score = min(sw, sh)
        if best is None or score>best[0]:
            best = (score, rows, per_side, sw, sh)
    if not best:
        return

    _, rows_fit, seats_side, seat_w, seat_h = best
    cols_total = seats_side*2

    # draw
    surface.fill((255,255,255))
    font = pygame.font.SysFont(None, 24)

    # border
    pygame.draw.rect(surface, (150,150,150),
                     (MARGIN, MARGIN, hall_w, hall_h), 5)
    # stage
    sx = MARGIN + (hall_w - hall_w*0.5)/2
    sy = MARGIN + PAD
    sw = hall_w * 0.5
    pygame.draw.rect(surface, (200,200,200),
                     (sx, sy, sw, STAGE_H))
    txt = font.render("STAGE", True, (0,0,0))
    surface.blit(txt, (sx+(sw-txt.get_width())/2,
                       sy+(STAGE_H-txt.get_height())/2))
    # aisle
    ax = MARGIN + (hall_w - AISLE_W)/2
    ay = sy + STAGE_H + PAD
    ah = hall_h - STAGE_H - 2*PAD
    pygame.draw.rect(surface, (220,220,220),
                     (ax, ay, AISLE_W, ah))
    # seats
    seat_no = 1
    for r in range(rows_fit):
        y = ay + PAD + r*(seat_h + PAD)
        for c in range(cols_total):
            if seat_no > total_seats: break
            if c < seats_side:
                x = MARGIN + PAD + c*(seat_w + PAD)
            else:
                x = (MARGIN + side_w + AISLE_W +
                     PAD + (c-seats_side)*(seat_w + PAD))
            pygame.draw.rect(surface, (245,245,220),
                             (x, y, seat_w, seat_h))
            num = font.render(str(seat_no), True, (0,0,0))
            surface.blit(num, (x + (seat_w-num.get_width())/2,
                              y + (seat_h-num.get_height())/2))
            seat_no += 1

def render_to_png(total_seats):
    pygame.init()
    surface = pygame.Surface((1000, 600))
    draw_theater(surface, total_seats)
    raw = pygame.image.tostring(surface, 'RGBA')
    img = Image.frombytes('RGBA', (1000, 600), raw).convert('RGB')
    buf = BytesIO()
    img.save(buf, 'PNG')
    buf.seek(0)
    return buf


