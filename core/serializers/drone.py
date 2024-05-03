from rest_framework import serializers
from core.models import Drone

class DroneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drone
        depth = 1
        fields = '__all__'  # Tüm alanları (fields) dahil etmek istiyorsak '__all__' kullanabiliriz
