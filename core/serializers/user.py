# core/serializers/user.py

from rest_framework import serializers
from core.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
