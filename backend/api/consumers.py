import json
from channels.generic.websocket import WebsocketConsumer
from .models import Pixel
from asgiref.sync import async_to_sync
from .utils import reset_canvas_state, load_canvas_state, get_canvas_size
from datetime import datetime

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
        print(f'CANVAS SIZE: {n}, {m}')

        self.send(text_data=json.dumps({
            'type': 'canvas_init',
            'canvas': canvas,
            'rows': n,
            'columns': m,
        }))

    def receive(self, text_data):
        data = json.loads(text_data)
        print(f'DATA: {data}')
        if data['type'] == 'place_pixel':
            x = int(data['x'])
            y = int(data['y'])
            color = data['color']
            user = data.get('user', 'anonymous')
            colored_at = datetime.fromtimestamp(data['colored_at'] / 1000).isoformat()
            print(f'USER: {user}')
        
            new_pixel, _ = Pixel.objects.update_or_create(x=x, y=y, color=color, user=user)
            new_pixel.save()

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'pixel_update',
                    'x': x,
                    'y': y,
                    'color': color,
                    'user': user,
                    'colored_at': colored_at,
                }
            )
        if data['type'] == 'reset_canvas':
            n, m = get_canvas_size()
            canvas = reset_canvas_state(n, m)
            Pixel.objects.all().delete() # TODO: change this if we want to implement multiple rooms - should only delete the pixels corresponding to the current room/session
            print('CANVAS RESET')
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'canvas_reset',
                    'canvas': canvas,
                    'rows': n,
                    'columns': m,
                }
            )

    
    def pixel_update(self, event):
        self.send(text_data=json.dumps({
            'type': 'update_pixel',
            'x': event['x'],
            'y': event['y'],
            'color': event['color'],
            'user': event['user'],
            'colored_at': event['colored_at'],
        }
        ))

    def canvas_reset(self, event):
        self.send(text_data=json.dumps({
            'type': 'reset_canvas',
            'canvas': event['canvas'],
            'rows': event['rows'],
            'columns': event['columns'],
        }))