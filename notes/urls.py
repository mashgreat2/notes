from django.urls import path
from .views import NotesListView, NotesDeleteView

urlpatterns = [
    path('', NotesListView.as_view()),
    path('<pk>/delete', NotesDeleteView.as_view()),
]