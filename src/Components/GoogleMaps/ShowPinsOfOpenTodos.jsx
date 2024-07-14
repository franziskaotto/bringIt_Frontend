import React, { useCallback, useEffect, useState } from "react";
import { Pin, AdvancedMarker } from "@vis.gl/react-google-maps";
const token = localStorage.getItem("token");

const ShowPinsOfOpenTodos = ({ openTodos }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [coordinatesTodos, setCoordinatesTodos] = useState([]);

  const fetchOpenTodos = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        await extractAddressesFromTodo(data);
        console.log(coordinatesTodos);
      } else {
        console.error("Failed to fetch OpenTodos");
        setErrorMessage("Failed to OpenTetch todos");
      }
    } catch (error) {
      console.error("Error fetching OpenTodos: ", error);
      setErrorMessage("Error fetching OpenTodos");
    }
  };

  const checkIfTodoExists = (todoId) => {
    return coordinatesTodos.some((existingTodo) => existingTodo.id === todoId);
  };

  const extractAddressesFromTodo = async (todos) => {
    try {
      const updatedTodos = await Promise.all(
        todos.map(async (todo) => {
          const { streetNumber, postalCode, city } = todo.userOffered.address;
          const address = `${streetNumber}, ${postalCode}, ${city}`;
          const coordinates = await convertAddressToPosition(address); // Await the promise

          return {
            ...todo,
            userOffered: {
              ...todo.userOffered,
              address: coordinates,
            },
          };
        })
      );
      console.log(updatedTodos[0]);

      // Checks for duplicates
      updatedTodos.forEach((todo) => {
        if (!checkIfTodoExists(todo.todoId)) {
          console.log(`Adding Todo ID: ${todo.todoId}`); // Debug log for adding todos
          setCoordinatesTodos((prevTodos) => [...prevTodos, todo]);
        } else {
          console.log(`Todo ID: ${todo.todoId} already exists, skipping.`);
        }
      });
    } catch (error) {
      console.error("Error extracting addresses: ", error);
    }
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
    fetchOpenTodos();
  }, []);

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
          position={{
            lat: address.userOffered.address.lat,
            lng: address.userOffered.address.lng,
          }}
        >
          <Pin
            background={"rgb(39, 201, 39"} // can also use image
            borderColor={"black"}
            glyphColor={"green"} //dot in the middle
          ></Pin>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default ShowPinsOfOpenTodos;
