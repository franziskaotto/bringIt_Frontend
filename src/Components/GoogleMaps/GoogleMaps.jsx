"use client";

import { useEffect, useState } from "react";
import "./GoogleMaps.css";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import CenterLocationPin from "./CenterLocationPin";
import ShowPinsOfOpenTodos from "./ShowPinsOfOpenTodos";
import ShowPinsOfAcceptedTodos from "./ShowPinsOfAcceptedTodos";

// const googleMapsAPIKey = "AIzaSyBacQv7qzQpvVYWkP9woi9FHEMJrFBN3Jk";
// const mapsId = "df621f6bd5a413fd";
const googleMapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapsId = import.meta.env.VITE_MAPS_ID;

const GoogleMaps = ({ openTodos, acceptedTodos, handleShowTodoExpanded }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const fetchLocation = async () => {
    try {
      const position = await getMyPosition();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } catch (error) {
      console.error("Error getting position", error);
    }
  };
  const getMyPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
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
              <CenterLocationPin latitude={latitude} longitude={longitude} />
              <ShowPinsOfOpenTodos
                openTodos={openTodos}
                handleShowTodoExpanded={handleShowTodoExpanded}
              />
              <ShowPinsOfAcceptedTodos
                acceptedTodos={acceptedTodos}
                handleShowTodoExpanded={handleShowTodoExpanded}
              />
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
