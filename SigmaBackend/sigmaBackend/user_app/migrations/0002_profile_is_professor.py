# Generated by Django 5.0.6 on 2024-07-28 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_professor',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]