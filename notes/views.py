from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from .models import Note
from .serializer import NoteSerializer

# Create your views here.
class NotesListView(ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NotesDeleteView(DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
