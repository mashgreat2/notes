from datetime import datetime
from django.utils import timezone

from django.db import models

# Create your models here.

class Note(models.Model):
    description = models.TextField(null=False)
    completed = models.BooleanField(null=False, default=False)
    created_on = models.DateTimeField(default=datetime.now, null=True)

    def __str__(self):
        return self.description[:30]

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.created_on = timezone.now()
        super().save(force_insert, force_update, using, update_fields)
