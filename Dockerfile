# Backend Stage
FROM python:3.9-alpine AS backend

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi-dev

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container for backend
WORKDIR /app/backend

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    apk del .build-deps

# Copy the Django project files
COPY backend/ .

# Frontend Stage
FROM node:18-alpine AS frontend

# Set the working directory in the container for frontend
WORKDIR /app/frontend

# Install Node.js dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --production

# Copy the rest of the frontend application code
COPY frontend/ .

# Build the Next.js application
RUN npm run build

# Final Stage: Combine and Run Both Backend and Frontend
FROM python:3.9-alpine

# Install Node.js runtime
RUN apk add --no-cache nodejs npm

# Set the working directory for the final container
WORKDIR /app

# Copy backend and frontend from the previous stages
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/frontend /app/frontend

# Install Python dependencies again in the final stage
WORKDIR /app/backend
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose ports for both backend and frontend
EXPOSE 8000 3000

# Start both servers
CMD ["sh", "-c", "cd /app/backend && python manage.py runserver 0.0.0.0:8000 & cd /app/frontend && npm run dev"]