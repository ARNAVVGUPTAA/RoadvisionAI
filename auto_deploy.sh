#!/bin/bash

# Configuration
BRANCH="main"
CHECK_INTERVAL=60 # Seconds

echo "Starting RoadVision Auto-Deployer watching branch: $BRANCH"

while true; do
    # Fetch headers from remote
    git fetch origin $BRANCH

    # Check if local is behind remote
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/$BRANCH)

    if [ $LOCAL != $REMOTE ]; then
        echo "$(date): New changes detected. Updating..."
        
        # Pull changes
        git pull origin $BRANCH
        
        # Rebuild and restart containers
        echo "$(date): Rebuilding containers..."
        docker compose up -d --build
        
        echo "$(date): Update complete."
    fi

    sleep $CHECK_INTERVAL
done
