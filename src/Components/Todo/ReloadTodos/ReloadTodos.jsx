import React from "react";
import PropTypes from "prop-types";
import "./ReloadTodos.css";

const ReloadTodos = ({ fetchTodos }) => {
  const handleReload = () => {
    fetchTodos(); // Call fetchTodos function passed from parent component (MyTodos)
  };

  return (
    <div className="reload-todos-btn">
      <div onClick={handleReload}>Todos aktualisieren</div>
    </div>
  );
};

// Define PropTypes for ReloadTodos component
ReloadTodos.propTypes = {
    fetchTodos: PropTypes.func.isRequired, // Ensure fetchTodos is a function and required
  };

export default ReloadTodos;
