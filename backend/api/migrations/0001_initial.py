# Generated by Django 5.2.1 on 2025-05-27 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pixel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.PositiveIntegerField()),
                ('y', models.PositiveIntegerField()),
                ('color', models.CharField(default='#FFFFFF', max_length=7)),
                ('user', models.CharField(blank=True, max_length=64, null=True)),
            ],
            options={
                'unique_together': {('x', 'y')},
            },
        ),
    ]
