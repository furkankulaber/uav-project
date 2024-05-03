# cores/serializers/__init__.py

from .booking import BookingSerializer
from .drone import DroneSerializer
from .user import UserSerializer


class Meta:
    app_label="core"
