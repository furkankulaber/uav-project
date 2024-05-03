# cores/models/__init__.py

from .user import CustomUser
from .drone import Drone
from .brand import Brand
from .category import Category
from .booking import Booking

class Meta:
    app_label="core"
