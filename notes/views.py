from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.registration.views import SocialConnectView
from .models import Note
from .serializer import NoteSerializer

# Create your views here.
class NotesListView(ListCreateAPIView):
    queryset = Note.objects.all().order_by('-created_on')
    serializer_class = NoteSerializer

    def get(self, request, *args, **kwargs):

        return super().get(request, *args, **kwargs)


class NotesDeleteView(DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# class GoogleLogin(SocialLoginView):
#     adapter_class = GoogleOAuth2Adapter
#
# class GoogleConnect(SocialConnectView):
#     adapter_class = GoogleOAuth2Adapter