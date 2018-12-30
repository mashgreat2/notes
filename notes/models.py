from datetime import datetime

from django.db import models

# Create your models here.

class Note(models.Model):
    description = models.TextField(null=False)
    completed = models.BooleanField(null=False, default=False)
    created_on = models.DateTimeField(default=datetime.now)