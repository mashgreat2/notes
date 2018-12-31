from django.urls import path
from .views import NotesListView, NotesDeleteView, NotesUpdateView

urlpatterns = [
    path('', NotesListView.as_view()),
    path('<pk>/delete', NotesDeleteView.as_view()),
    path('<pk>/update', NotesUpdateView.as_view()),
]