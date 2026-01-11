# backend/tour/urls.py
from django.urls import path
from .views import HotspotListCreate, FeedbackListCreate

urlpatterns = [
    path('hotspots/', HotspotListCreate.as_view(), name='hotspots'),
    path('feedback/', FeedbackListCreate.as_view(), name='feedback'),
]
