from rest_framework import serializers
from core.models import Booking
from .user import UserSerializer


class BookingSerializer(serializers.ModelSerializer):
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    status = serializers.ChoiceField(choices=Booking.STATUS_CHOICES, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Booking
        depth = 2
        fields = ['id', 'start_datetime', 'end_datetime', 'total_price', 'status', 'drone', 'user','created_at','updated_at']
