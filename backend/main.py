from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime, timedelta

app = FastAPI(title="RoadVision AI Backend")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to RoadVision AI API"}

@app.get("/api/analytics")
def get_analytics():
    """
    Returns simulated video analytics data.
    """
    # Simulate some time-series data for vehicle counts
    data = []
    now = datetime.now()
    for i in range(12):
        time_point = now - timedelta(hours=i)
        data.append({
            "timestamp": time_point.strftime("%H:%M"),
            "vehicle_count": random.randint(10, 100),
            "pedestrian_count": random.randint(5, 50),
            "anomaly_score": round(random.uniform(0, 1), 2)
        })
    return {"data": list(reversed(data))}

@app.get("/api/gis")
def get_gis_data():
    """
    Returns simulated GIS/Map data (GeoJSON format).
    """
    # Simulate some traffic incidents or camera locations
    features = []
    
    # Generate random points around a central coordinate (e.g., a city center)
    base_lat = 40.7128
    base_lon = -74.0060
    
    for i in range(5):
        lat = base_lat + random.uniform(-0.02, 0.02)
        lon = base_lon + random.uniform(-0.02, 0.02)
        severity = random.choice(["Low", "Medium", "High"])
        
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            },
            "properties": {
                "id": str(i + 1),
                "type": "Traffic Incident",
                "severity": severity,
                "description": f"Incident #{i+1} observed"
            }
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
