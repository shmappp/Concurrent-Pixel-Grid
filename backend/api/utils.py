from .models import Pixel
import os

def load_canvas_state(n, m):
    canvas = []
    for j in range(m):
        for i in range(n):
            canvas.append({'x':i, 'y':j, 'color': '#FFFFFF', 'user': None})

    for pixel in Pixel.objects.all():
        canvas[pixel.y*n + pixel.x] = {'x':pixel.x, 'y':pixel.y, 'color':pixel.color, 'user':pixel.user}
    
    return canvas

def get_canvas_size():
    return (os.environ.get('CANVAS_ROWS', 50), os.environ.get('CANVAS_COLS', 50))