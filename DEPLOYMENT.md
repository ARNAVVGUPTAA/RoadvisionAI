# Deployment & Hosting Guide (Docker Version)

This guide explains how to host the RoadVision AI application using Docker Compose with an auto-update mechanism.

## Prerequisites
- A Linux server (e.g., Ubuntu).
- Docker and Docker Compose installed.
- Git installed.
- Cloudflare Tunnel configured (as per previous instructions).

## Part 1: Initial Setup

1. **Clone the Repository**
   ```bash
   git clone <YOUR_REPO_URL> roadvision
   cd roadvision
   ```

2. **Start the Application**
   ```bash
   docker compose up -d --build
   ```
   - This builds both backend and frontend images.
   - The app will be available on port 80.
   - API requests to `/api` are automatically proxied to the backend.

## Part 2: Auto-Update Setup

The `auto_deploy.sh` script checks for changes in the GitHub repository every 60 seconds. If a change is found, it pulls the code and rebuilds the containers.

### Method A: Run in Background (Simple)
```bash
./auto_deploy.sh > deploy.log 2>&1 &
```

### Method B: Run as Systemd Service (Robust)
1. Create a service file:
   ```bash
   sudo nano /etc/systemd/system/roadvision-updater.service
   ```
2. Add the following content (adjust paths as needed):
   ```ini
   [Unit]
   Description=RoadVision Auto Updater
   After=docker.service
   Requires=docker.service

   [Service]
   Type=simple
   User=ubuntu
   WorkingDirectory=/home/ubuntu/roadvision
   ExecStart=/home/ubuntu/roadvision/auto_deploy.sh
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
3. Enable and start:
   ```bash
   sudo systemctl enable roadvision-updater
   sudo systemctl start roadvision-updater
   ```

## Part 3: Exposing to Internet

Use Cloudflare Tunnel to expose the Docker service.

```bash
cloudflared tunnel --url http://localhost:80
```
Or configure your `config.yml` to point to `http://localhost:80`.

## Summary
- **Docker Compose** manages the stack.
- **Nginx** (in frontend container) serves React and proxies API key.
- **Auto-Deploy Script** keeps the app in sync with GitHub.
