from datetime import datetime

from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from core.models import Drone, Brand, Category
from .brand import BrandSerializer
from .category import CategorySerializer


class DroneSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Drone
        depth = 1
        fields = '__all__'

    def create(self, validated_data):
        brand_data = self.initial_data.pop('brand')
        category_data = self.initial_data.pop('category')

        brand = Brand.objects.get(pk=brand_data['id'])
        category = Category.objects.get(pk=category_data['id'])

        drone = Drone.objects.create(brand=brand, category=category, **self.initial_data)

        return drone

    def update(self, instance, validated_data):
        if 'brand' in self.initial_data:
            brand_data = self.initial_data.pop('brand')
            instance.brand = Brand.objects.get(pk=brand_data['id'])
        if 'category' in self.initial_data:
            category_data = self.initial_data.pop('category')
            instance.category = Category.objects.get(pk=category_data['id'])

        for attr, value in self.initial_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    def get_total_price(self, obj):
        start_date = self.context['request'].query_params.get('start_date')
        end_date = self.context['request'].query_params.get('end_date')

        if start_date and end_date:
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d')
            total_days = (end_date - start_date).days
            return total_days * obj.price
        else:
            return obj.price
