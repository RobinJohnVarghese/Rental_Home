# Generated by Django 5.0 on 2024-02-14 13:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0002_alter_chatmessage_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatmessage',
            name='user',
        ),
    ]
