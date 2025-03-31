import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import livePositionImage from "../../images/truck_running_icon.png";

// Google Maps container styles
const mapContainerStyle = {
  height: "100vh",
};

// Default map options
const mapOptions = {
  disableDefaultUI: true, // Hide UI controls
  zoomControl: true, // Enable zoom
};

// Google Maps API Key (Replace with your actual key)
const GOOGLE_MAPS_API_KEY = "AIzaSyC5lIvwH6BHmPN_SvACovdOf-t59kfP12c";

function MapSite() {
  const [routePath, setRoutePath] = useState([]); // Travel history
  const [stoppagePoints, setStoppagePoints] = useState([]); // Stoppage locations
  const [latestPosition, setLatestPosition] = useState({ lat: 21.806709, lng: 81.993319 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, 
  });

  // Fetch tracking data
  const fetchTrackingData = () => {
    fetch("https://roadlyne.xyz/api/v1/tracking/share/live?token=Q0cxMEJMNTY3OC10cmFjay04NjQwMA==")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data?.data?.history) {
          const history = data.data.data.history;

          // Extract travel history
          const newRoutePath = history.flatMap((entry) =>
            entry.all_status.map((point) => ({ lat: point.lat, lng: point.lon }))
          );

          setRoutePath(newRoutePath);

          // Extract stoppage locations
          const newStoppages = history
            .filter((entry) => entry.type === "stoppage")
            .map((entry) => ({
              lat: entry.all_status[0].lat,
              lng: entry.all_status[0].lon,
              address: entry.address,
            }));

          setStoppagePoints(newStoppages);

          // Update latest vehicle position
          if (newRoutePath.length > 0) {
            setLatestPosition(newRoutePath[newRoutePath.length - 1]);
          }
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  // Fetch data initially and update every 10 seconds
  useEffect(() => {
    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap center={latestPosition} zoom={12} mapContainerStyle={mapContainerStyle} options={mapOptions}>
      
      {/* Live Vehicle Marker */}
      <Marker 
        position={latestPosition} 
        icon={{
          url: livePositionImage,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />

      {/* Stoppage Markers */}
      {stoppagePoints.map((stop, index) => (
        <Marker 
          key={index} 
          position={{ lat: stop.lat, lng: stop.lng }} 
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}

      {/* Route History Line */}
      <Polyline 
        path={routePath} 
        options={{
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 4,
        }}
      />

    </GoogleMap>
  );
}

export default MapSite;
