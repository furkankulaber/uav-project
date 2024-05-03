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

# Copy entry script
COPY ./docker/entrypoint.sh .

# Make entrypoint.sh executable
RUN chmod +x entrypoint.sh

# Define entrypoint
ENTRYPOINT ["./entrypoint.sh"]