"use client";

import React, { useEffect, useState } from 'react'
import "./GoogleMaps.css"
import {createRoot} from "react-dom/client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMapsLibrary,
  ControlPosition,
} from "@vis.gl/react-google-maps";


const googleMapsAPIKey = "AIzaSyBacQv7qzQpvVYWkP9woi9FHEMJrFBN3Jk";
const mapsId = "df621f6bd5a413fd";




const GoogleMaps = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);


  const getMyPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getMyPosition();
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(
          "Latitude: " +
            position.coords.latitude +
            ", Longitude: " +
            position.coords.longitude
        );
      } catch (error) {
        console.error("Error getting position", error);
      }
    };
    fetchLocation();

  }, []);


  return (
    <>
      <APIProvider
        apiKey={googleMapsAPIKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <div className="map-container">
          {latitude !== null && longitude !== null ? (
            <Map
              defaultZoom={15}
              defaultCenter={{ lat: latitude, lng: longitude }}
              mapId={mapsId}
              gestureHandling={"greedy"} // handles gestures with handx, greey = all touch gestures, scrolling, zoom
              // disableDefaultUI={true} //nur wenn wir was eigenes erstellen wollen
            >
              <AdvancedMarker
                position={{ lat: latitude, lng: longitude }}
              ></AdvancedMarker>

              <Geocoding />
            </Map>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </APIProvider>
    </>
  );
}
//the <APIProvider needs to wrap everything 

// neues Component erstellen, wenn machbar?

const Geocoding = () => {
  const geocodingLibrary = useMapsLibrary("geocoding");
  useEffect(() => {
    if (!geocodingLibrary) return;

    const geocoder = new geocodingLibrary.Geocoder();
    // ...
  }, [geocodingLibrary]);
}

export default GoogleMaps;
