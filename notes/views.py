from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Note
from .serializer import NoteSerializer

# Create your views here.
class NotesListView(ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
