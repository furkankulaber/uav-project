# cores/views/__init__.py

from .booking import BookingViewSet
from .drone import DroneViewSet
from .user import UserInfoView
from .category import CategoryViewSet
from .brand import BrandViewSet

class Meta:
    app_label="core"
