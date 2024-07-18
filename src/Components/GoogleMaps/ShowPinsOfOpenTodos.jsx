import React, { useCallback, useEffect, useState } from "react";
import { Pin, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
const token = localStorage.getItem("token");

const ShowPinsOfOpenTodos = ({ openTodos }) => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [coordinatesTodos, setCoordinatesTodos] = useState([]);

  const extractAddressesFromTodo = async (todos) => {
    try {
      const updatedTodos = await Promise.all(
        todos.map(async (todo) => {
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

      // Checks for duplicates
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
    if (openTodos && openTodos.length > 0) {
      extractAddressesFromTodo(openTodos);
    }
  }, [openTodos]);

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
            background={"red"} // can also use image
            borderColor={"black"}
            glyphColor={"maroon"} //dot in the middle
          ></Pin>
        </AdvancedMarker>
      ))}
      {selectedPin && (
        <InfoWindow
          position={{
            lat: selectedPin.userOffered.address.lat,
            lng: selectedPin.userOffered.address.lng,
          }}
          onCloseClick={() => setSelectedPin(null)}
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

export default ShowPinsOfOpenTodos;
