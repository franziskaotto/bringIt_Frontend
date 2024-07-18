import React, { useEffect, useState } from "react";
import { Pin, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
const token = localStorage.getItem("token");

const ShowPinsOfAcceptedTodos = ({ acceptedTodos }) => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [coordinatesTodos, setCoordinatesTodos] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"), 10);

  const extractAddressesFromTodo = async (todos) => {
    try {
      const updatedTodos = await Promise.all(
        todos
          .filter((todo) => todo.status === "In Arbeit")
          .map(async (todo) => {
            const { streetNumber, postalCode, city } = todo.userOffered.address;
            const address = `${streetNumber}, ${postalCode}, ${city}`;
            const coordinates = await convertAddressToPosition(address);
            return {
              ...todo,
              userOffered: {
                ...todo.userOffered,
                address: coordinates,
              },
            };
          })
      );

      // Check for duplicates and update the state
      updatedTodos.forEach((todo) => {
        if (!checkIfTodoExists(todo.todoId)) {
          setCoordinatesTodos((prevTodos) => [...prevTodos, todo]);
        } else {
          console.log(`Todo ID: ${todo.todoId} already exists, skipping.`);
        }
      });
    } catch (error) {
      console.error("Error extracting addresses: ", error);
    }
  };

  const checkIfTodoExists = (todoId) => {
    return coordinatesTodos.some((existingTodo) => existingTodo.id === todoId);
  };

  const convertAddressToPosition = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
          reject(status);
        }
      });
    });
  };

  useEffect(() => {
    if (acceptedTodos && acceptedTodos.length > 0) {
      console.log("Processing acceptedTodos prop:", acceptedTodos);
      extractAddressesFromTodo(acceptedTodos);
    }
  }, [acceptedTodos]);

  return (
    <>
      {coordinatesTodos.map((address, index) => (
        <AdvancedMarker
          key={index}
          onClick={() => setSelectedPin(address)}
          position={{
            lat: address.userOffered.address.lat,
            lng: address.userOffered.address.lng,
          }}
        >
          <Pin
            key={address.todoId}
            background={"yellow"} // can also use image
            borderColor={"black"}
            glyphColor={"#755100"} //dot in the middle
            //
          ></Pin>
        </AdvancedMarker>
      ))}

      {selectedPin && (
        <InfoWindow
          onCloseClick={() => setSelectedPin(null)}
          position={{
            lat: selectedPin.userOffered.address.lat,
            lng: selectedPin.userOffered.address.lng,
          }}
        >
          <p className="pin-description">Todo ID: {selectedPin.todoId}</p>
          <p className="pin-description">Titel: {selectedPin.title}</p>
          <p className="pin-description">Details: {selectedPin.description}</p>
          <p className="pin-description">
            User: {selectedPin.userOffered.username}
          </p>
          <p className="pin-description">Woher: {selectedPin.location}</p>
          <button className="btn-description">▶️ Todo</button>
        </InfoWindow>
      )}
    </>
  );
};

export default ShowPinsOfAcceptedTodos;
