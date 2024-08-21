# Use an official Python runtime as the parent image
FROM python:3.9-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi-dev

# Set the working directory in the container
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    apk del .build-deps

# Copy the Django project files
COPY . .

# Expose the port the app runs on
EXPOSE 80

# Define the command to run the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]