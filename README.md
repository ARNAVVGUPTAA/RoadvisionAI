# RoadVision AI Assessment

## Overview

This repository contains the solution for the RoadVision AI White Labelling Assignment. The application is a full-stack platform designed to visualize real-time simulated video analytics and GIS data. It features a Python backend using FastAPI and a React frontend dashboard.

## Key Features

*   **Real-time Dashboard**: Visualize traffic data and system status.
*   **Analytics Charts**: Time-series data for vehicle and pedestrian counts.
*   **GIS Mapping**: Interactive map displaying traffic incidents and severity.
*   **Incident Analysis**: Severity distribution charts (High/Medium/Low).
*   **Activity Feed**: Live log of system events and alerts.
*   **Stats Overview**: Quick summary cards for key metrics (Traffic Flow, Active Incidents, etc.).

## Architecture

The application follows a microservices architecture, containerized using Docker:

*   **Backend**: A FastAPI application providing RESTful endpoints (Port 8085).
*   **Frontend**: A React application (built with Vite) served via Nginx (Port 80).
*   **Reverse Proxy**: Nginx handles internal routing, serving static assets and proxying API requests to the backend.
*   **Deployment**: Designed for automated deployment via Docker Compose and a custom auto-update script.

## Technology Stack

*   **Language**: Python 3.10+, JavaScript (ES6+)
*   **Backend Framework**: FastAPI
*   **Frontend Library**: React 18, Chart.js, Leaflet
*   **Containerization**: Docker, Docker Compose
*   **Server**: Nginx

## Directory Structure

*   `backend/`: Contains the FastAPI application source code and requirements.
*   `frontend/`: Contains the React application source code and Nginx configuration.
*   `docker-compose.yml`: Service orchestration configuration.

## Getting Started

### Prerequisites

*   Docker Engine
*   Docker Compose

### Installation & Running

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd roadvision
    ```

2.  Start the application using Docker Compose:
    ```bash
    docker compose up -d --build
    ```

3.  Access the dashboard:
    *   Open a web browser and navigate to `http://localhost`.

## API Endpoints

The backend exposes the following endpoints (internally on port 8085, proxied via `http://localhost/api`):

*   `GET /api/analytics`: Returns simulated time-series data for vehicle and pedestrian counts.
*   `GET /api/gis`: Returns GeoJSON feature collections for simulated traffic incidents.

## Deployment

For detailed hosting instructions, including AWS EC2 setup and Cloudflare Tunnel configuration, please refer to the `DEPLOYMENT.md` file located in this repository.

## Automation

An automated deployment script (`auto_deploy.sh`) is provided to facilitate continuous delivery. It monitors the repository for changes and automatically rebuilds the containers when updates are detected.
