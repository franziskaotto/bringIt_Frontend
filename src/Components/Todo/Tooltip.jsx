import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ text, visible }) => {
  return <div className={`tooltip ${visible ? "visible" : ""}`}>{text}</div>;
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Tooltip;
