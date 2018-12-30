from django.contrib import admin
from .models import Note

admin.site.register(Note)

# Register your models here.
# ModelAdmin allows for further customization.
# @admin.register(ToDoItem)
# class ToDoAdmin(admin.ModelAdmin):
#     pass