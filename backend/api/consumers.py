import json
from channels.generic.websocket import WebsocketConsumer
from .models import Pixel
from asgiref.sync import async_to_sync
from .utils import load_canvas_state, get_canvas_size

class PixelConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'canvas'
        self.accept()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        n, m = get_canvas_size()
        canvas = load_canvas_state(n, m)

        self.send(text_data=json.dumps({
            'type': 'canvas_init',
            'canvas': canvas
        }))

    def receive(self, text_data):
        data = json.loads(text_data)
        print(f'DATA: {data}')
        if data['type'] == 'place_pixel':
            x = int(data['x'])
            y = int(data['y'])
            color = data['color']
            user = data.get('user', 'anonymous')
            print(f'USER: {user}')
        
            new_pixel, _ = Pixel.objects.get_or_create(x=x, y=y, color=color, user=user)
            new_pixel.save()

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'pixel_update',
                    'x': x,
                    'y': y,
                    'color': color,
                    'user': user
                }
            )
    
    def pixel_update(self, event):
        self.send(text_data=json.dumps({
            'type': 'update_pixel',
            'x': event['x'],
            'y': event['y'],
            'color': event['color'],
            'user': event['user']
        }
        ))
