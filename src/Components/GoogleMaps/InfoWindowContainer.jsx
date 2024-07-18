import React from "react";
import { InfoWindow } from "@vis.gl/react-google-maps";
import "./InfoWindowContainer.css";

const InfoWindowContainer = ({
  selectedPin,
  setSelectedPin,
  handleShowTodoExpanded,
}) => {
  return (
    <InfoWindow
      className="info-window"
      position={{
        lat: selectedPin.userOffered.address.lat,
        lng: selectedPin.userOffered.address.lng,
      }}
      onCloseClick={() => setSelectedPin(null)}
    >
      <p className="pin-description">
        Todo ID: <span className="todo-id">{selectedPin.todoId}</span>
        <span className="user-description">
          User:{" "}
          <span className="user-offered">
            {selectedPin.userOffered.username}
          </span>
        </span>
      </p>
      <p className="title-description">
        Titel: <span className="title">{selectedPin.title}</span>
      </p>
      <p className="pin-description">
        Details: <span className="todo-details">{selectedPin.description}</span>
      </p>

      <p className="pin-description">
        Woher: <span className="todo-location">{selectedPin.location}</span>
      </p>
      <div className="btn-container">
        <button
          className="btn-description"
          onClick={() =>
            handleShowTodoExpanded(selectedPin.todoId, selectedPin.status)
          }
        >
          ▶️ Todo
        </button>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowContainer;
