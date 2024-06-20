import React, { useEffect, useRef, useState } from "react";
import "./TomTomMap.css";

import tt from "@tomtom-international/web-sdk-maps";

const KEY = "BqBA01CipujA3uzkCYoxjc0RTYKjAMBq";

const TomTomMap = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const mapElement = useRef(null);

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
      } catch (error) {
        console.error("Error getting position", error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const map = tt.map({
      key: KEY,
      container: mapElement.current,
      center: [longitude, latitude], // Coordinates of the map center
      zoom: 15,
    });

    const marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => {
      marker.remove();
      map.remove();
    };
  }, [longitude, latitude]);

  return (
    <div ref={mapElement} style={{ height: "500px", width: "100%" }}></div>
  );
};

export default TomTomMap;
