"""
URL configuration for UavRentalProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from rest_framework import routers
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from core.views import DroneViewSet,BookingViewSet, UserInfoView, CategoryViewSet, BrandViewSet

router = routers.DefaultRouter()

schema_view = get_schema_view(
    openapi.Info(
        title="UAV Rental API Documentation",
        default_version='v1',
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)


router.register(r'api/drones', DroneViewSet, basename='drone')
router.register(r'api/bookings', BookingViewSet, basename='booking')
router.register(r'api/category', CategoryViewSet, basename='category')
router.register(r'api/brands', BrandViewSet, basename='brand')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),  # Burası değişti
    path('api/user-info/', UserInfoView.as_view(), name='user-info'),
    path('api/drones/available_drones/', DroneViewSet.as_view({'get': 'available_drones'}), name='available-drones'),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
