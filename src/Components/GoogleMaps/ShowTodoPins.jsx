import React, { useCallback, useEffect, useState } from "react";
import { Pin, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import InfoWindowContainer from "./InfoWindowContainer";
const token = localStorage.getItem("token");

const ShowTodoPins = ({ todos, handleShowTodoExpanded }) => {
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
    if (todos && todos.length > 0) {
      extractAddressesFromTodo(todos);
      setSelectedPin(null);
    }
  }, [todos]);

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
          {todos[0].status === "Offen" && (
            <Pin
              background={"red"} // can also use image
              borderColor={"black"}
              glyphColor={"maroon"} //dot in the middle
            ></Pin>
          )}
          {todos[0].status === "In Arbeit" && (
            <Pin
              background={"yellow"} // can also use image
              borderColor={"black"}
              glyphColor={"#755100"} //dot in the middle
              //
            ></Pin>
          )}
        </AdvancedMarker>
      ))}
      {selectedPin && (
        <InfoWindowContainer
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          handleShowTodoExpanded={handleShowTodoExpanded}
        />
      )}
    </>
  );
};

export default ShowTodoPins;
