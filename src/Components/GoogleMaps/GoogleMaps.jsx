"use client";

import React, { useEffect, useState } from "react";
import "./GoogleMaps.css";
import { createRoot } from "react-dom/client";

import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Directions from "./Directions";

const googleMapsAPIKey = "AIzaSyBacQv7qzQpvVYWkP9woi9FHEMJrFBN3Jk";
const mapsId = "df621f6bd5a413fd";
// const googleMapsAPIKey = process.env.NEXT_GOOGLE_MAPS_KEY;
// const mapsId = process.env.NEXT_MAPS_ID;

const fetchAllTodo = async () => {};

const GoogleMaps = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [allTodo, setAllTodo] = useState([]);
  console.log(latitude, longitude);
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
  const getMyPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const points = [
    {
      lat: 48.14,
      lng: 16.24,
    },
    {
      lat: 48.08143,
      lng: 16.13578,
    },
    {
      lat: 48.18,
      lng: 16.29,
    },
  ];

  useEffect(() => {
    fetchAllTodo();
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
              gestureHandling={"greedy"} // handles gestures with handy, greedy = all touch gestures, scrolling, zoom
              // disableDefaultUI={true} //nur wenn wir was eigenes erstellen wollen
              options={{}}
            >
              <AdvancedMarker position={{ lat: latitude, lng: longitude }}>
                <Pin
                  background={"#eef1f8"} // can also use image
                  borderColor={"#03045e"}
                  glyphColor={"#03045e"} //dot in the middle
                ></Pin>
              </AdvancedMarker>
              {points.map((point, index) => (
                <AdvancedMarker key={index} position={point}>
                  <Pin
                    background={"#eef1f8"} // can also use image
                    borderColor={"#03045e"}
                    glyphColor={"#03045e"} //dot in the middle
                  ></Pin>
                </AdvancedMarker>
              ))}
              <Directions />
            </Map>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </APIProvider>
    </>
  );
};

export default GoogleMaps;

//Info für uns:
/*
<APIProvider />
 - needs to wrap everything, 
 - it loads all of the different libraries combined with our API KEY








*/
