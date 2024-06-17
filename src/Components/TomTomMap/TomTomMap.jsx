import React, { useEffect, useRef } from 'react'

import tt from "@tomtom-international/web-sdk-maps";


const KEY = "BqBA01CipujA3uzkCYoxjc0RTYKjAMBq";


const TomTomMap = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = tt.map({
      key: KEY,
      container: mapElement.current,
      center: [16.372, 48.208], // Coordinates of the map center
      zoom: 10
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapElement} style={{ height: '500px', width: '100%' }}></div>
  );
};

export default TomTomMap;