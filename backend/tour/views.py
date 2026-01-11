# backend/tour/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Hotspot, Feedback
from .serializers import HotspotSerializer, FeedbackSerializer

class HotspotListCreate(generics.ListCreateAPIView):
    queryset = Hotspot.objects.all()
    serializer_class = HotspotSerializer

class FeedbackListCreate(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
