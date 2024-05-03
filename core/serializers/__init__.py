# cores/serializers/__init__.py

from .booking import BookingSerializer
from .drone import DroneSerializer
from .user import UserSerializer
from .category import CategorySerializer
from .brand import BrandSerializer


class Meta:
    app_label="core"
