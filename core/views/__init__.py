# cores/views/__init__.py

from .booking import BookingViewSet
from .drone import DroneViewSet
from .user import UserInfoView

class Meta:
    app_label="core"
