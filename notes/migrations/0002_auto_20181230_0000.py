# Generated by Django 2.1.4 on 2018-12-30 00:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ToDoItem',
            new_name='Note',
        ),
    ]