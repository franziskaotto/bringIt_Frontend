import React, { useEffect, useState } from "react";
import { Pin, AdvancedMarker } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

const CenterLocationPin = ({ latitude, longitude }) => {
  return (
    <AdvancedMarker position={{ lat: latitude, lng: longitude }}>
      <Pin
        background={"#eef1f8"} // can also use image
        borderColor={"#03045e"}
        glyphColor={"#03045e"} //dot in the middle
      ></Pin>
    </AdvancedMarker>
  );
};

CenterLocationPin.propTypes = {
  latitude: PropTypes.String,
  longitude: PropTypes.String,
};

export default CenterLocationPin;
