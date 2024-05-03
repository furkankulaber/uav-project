from rest_framework import viewsets
from core.models import Brand
from core.serializers import BrandSerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer