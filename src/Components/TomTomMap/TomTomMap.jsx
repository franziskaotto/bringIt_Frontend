import React, { useEffect, useRef, useState } from 'react'

import tt from "@tomtom-international/web-sdk-maps";


const KEY = "BqBA01CipujA3uzkCYoxjc0RTYKjAMBq";



const findMyState = (setLatitude, setLongitude) => {

  const success = (position) => {

    setLongitude(position.coords.latitude);
    setLatitude(position.coords.longitude);
   
  }

  const error = () => {
    console.log("error getting position")
  }

  navigator.geolocation.getCurrentPosition(success, error);

}


const TomTomMap = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  findMyState(setLatitude, setLongitude);

  const mapElement = useRef(null);
  
  
  useEffect(() => {
   
    if(longitude !== null && latitude !== null) { //hier weiß ich grad nicht ob wir das wirklich brauchen
      const map = tt.map({
        key: KEY,
        container: mapElement.current,
        center: [latitude, longitude], // Coordinates of the map center
        zoom: 15,
      });
  
      return () => map.remove();

    }
  }, []);

  return (
    <div ref={mapElement} style={{ height: '500px', width: '100%' }}></div>
  );
};

export default TomTomMap;