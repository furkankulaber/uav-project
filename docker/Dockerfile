# Dockerfile

# Set the base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the required dependencies
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the project files
COPY . .

# Run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
