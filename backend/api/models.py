from django.db import models

class Pixel(models.Model):
    x = models.PositiveIntegerField()
    y = models.PositiveIntegerField()
    color = models.CharField(max_length=7, default='#FFFFFF') 
    user = models.CharField(max_length=64, null=True, blank=True)
    colored_at = models.DateTimeField(auto_now_add=True, null=True)
    