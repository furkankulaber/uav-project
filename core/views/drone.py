from rest_framework import viewsets, permissions, serializers
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime
from rest_framework import filters
from rest_framework.decorators import action

from core.models import Drone, Brand, Category
from core.serializers import DroneSerializer
from core.filters import CustomPagination


class DroneViewSet(viewsets.ModelViewSet):
    queryset = Drone.objects.all()
    serializer_class = DroneSerializer
    permission_classes = [permissions.IsAdminUser | permissions.IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['price', 'model', 'currency', 'weight']
    ordering_fields = ['id','price', 'brand.name', 'category.name', 'model', 'currency', 'weight', 'status']

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()

    @action(detail=False, methods=['get'])
    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('start_date', openapi.IN_QUERY,
                          description="Start date for drone availability",
                          type=openapi.TYPE_STRING, required=True, format=openapi.FORMAT_DATE),
        openapi.Parameter('end_date', openapi.IN_QUERY,
                          description="End date for drone availability",
                          type=openapi.TYPE_STRING, required=True, format=openapi.FORMAT_DATE),
    ])
    def available_drones(self, request):
        start_datetime = request.query_params.get('start_date')
        end_datetime = request.query_params.get('end_date')

        # Check if start_datetime and end_datetime parameters are provided
        if start_datetime and end_datetime:
            try:
                start_datetime = datetime.strptime(start_datetime, '%Y-%m-%d')
                end_datetime = datetime.strptime(end_datetime, '%Y-%m-%d')
            except ValueError:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

            # Find drones that are not booked during the specified time range
            available_drones = self.get_queryset().exclude(
                Q(booking__start_datetime__lte=start_datetime, booking__end_datetime__gte=start_datetime) |
                Q(booking__start_datetime__lte=end_datetime, booking__end_datetime__gte=end_datetime) |
                Q(booking__start_datetime__gte=start_datetime, booking__end_datetime__lte=end_datetime)
            )
            serializer = self.get_serializer(available_drones, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "start_datetime and end_datetime parameters are required"},
                            status=status.HTTP_400_BAD_REQUEST)
