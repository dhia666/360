# backend/tour/serializers.py
from rest_framework import serializers
from .models import Hotspot, Feedback

class HotspotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotspot
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Feedback
        fields = ['id', 'user', 'comment', 'created_at']
