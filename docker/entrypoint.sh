#!/bin/bash

# Django migrations
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata data.json
python manage.py runserver 0.0.0.0:8000
# Run the Django application
exec "$@"
