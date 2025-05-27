from .models import Pixel
import os

def load_canvas_state(n, m):
    canvas = [[{'color': '#FFFFFF', 'user': None} for _ in range(n)] for _ in range(m)]

    for pixel in Pixel.objects.all():
        canvas[pixel.y][pixel.x] = {pixel.color, pixel.user}
    
    return canvas

def get_canvas_size():
    return (os.environ.get('CANVAS_ROWS', 20), os.environ.get('CANVAS_COLS', 20))