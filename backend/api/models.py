from django.db import models

class Pixel(models.Model):
    x = models.PositiveIntegerField()
    y = models.PositiveIntegerField()
    color = models.CharField(max_length=7) 
    user = models.CharField(max_length=64)

    class Meta:
        unique_together = ('x', 'y')
    