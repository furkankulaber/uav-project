from datetime import datetime

from django.db.models import Q
from rest_framework import viewsets, permissions, serializers
from rest_framework.response import Response

from core.models import Booking, Drone
from core.serializers import BookingSerializer
from rest_framework import filters
from core.filters import CustomPagination

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAdminUser | permissions.IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['drone__brand__name', 'drone__model', 'status']
    ordering_fields = ['start_datetime', 'end_datetime']

    def perform_create(self, serializer):
        start_datetime = serializer.validated_data.get('start_datetime')
        end_datetime = serializer.validated_data.get('end_datetime')
        drone_id = serializer.initial_data.get('drone')
        drone = Drone.objects.get(id=drone_id)

        overlapping_bookings = Booking.objects.filter(
            Q(drone=drone_id),
            Q(start_datetime__lt=end_datetime, end_datetime__gt=start_datetime)
        ).exists()

        if overlapping_bookings:
            raise serializers.ValidationError("The drone is already booked for this time period.")


        delta = end_datetime - start_datetime

        total_price = delta.days * drone.price

        user = self.request.user
        status = 'Pending'

        serializer.save(user=user, total_price=total_price, status=status, drone=drone, currency=drone.currency)

    def perform_update(self, serializer):
        status = serializer.initial_data.get('status')

        serializer.save(status=status)

    def perform_destroy(self, instance):
        instance.delete()

    def list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            queryset = self.filter_queryset(self.get_queryset())
        else:
            queryset = self.filter_queryset(self.get_queryset().filter(user=request.user))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
