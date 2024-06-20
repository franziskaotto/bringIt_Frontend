"use client";

import React, { useEffect, useState } from 'react'


import { APIProvider,Map } from "@vis.gl/react-google-maps";

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
        apiKey={"AIzaSyBacQv7qzQpvVYWkP9woi9FHEMJrFBN3Jk"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <div style={{ height: "500px", width: "50%" }}>
          {latitude !== null && longitude !== null ? (
            <Map zoom={15} center={{ lat: latitude, lng: longitude }}></Map>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </APIProvider>
    </>
  );
}

export default GoogleMaps;

//the <APIProvider needs to wrap everything 