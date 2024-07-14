import React, { useEffect, useState } from "react";
import { Pin, AdvancedMarker } from "@vis.gl/react-google-maps";
const token = localStorage.getItem("token");

const ShowPinsOfTodos = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openTodos, setOpenTodos] = useState([]);
  const [location, setLocation] = useState(null);
  const [adressesOpenTodos, setAdressesOpenTodos] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"), 10);

  const fetchOpenTodos = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        /*
        // Filter todos based on userId -> remove todos by current user
        const filteredTodos = data.filter(
          (todo) => todo.userOffered.userId !== userId
        );
        setOpenTodos(filteredTodos);
        fetchAllAdresses(filteredTodos);
        console.log("Adresses OpenTodos: ", adressesOpenTodos);
        return filteredTodos;
*/

        setOpenTodos(data);
        fetchAllAdresses(data);
        console.log("Adresses OpenTodos: ", adressesOpenTodos);
        return data;
      } else {
        console.error("Failed to fetch OpenTodos");
        setErrorMessage("Failed to OpenTetch todos");
      }
    } catch (error) {
      console.error("Error fetching OpenTodos: ", error);
      setErrorMessage("Error fetching OpenTodos");
    }
  };

  const fetchAllAdresses = async (todos) => {
    console.log(todos);
    const destinations = todos.map((todo) => {
      console.log(todo);
      const { streetNumber, postalCode, city } = todo.userOffered.address;
      return `${streetNumber}, ${postalCode}, ${city}`;
    });
    console.log("destinations: ", destinations);

    const positionsPromises = destinations.map((destination) =>
      convertAddressToPosition(destination)
    );

    try {
      const positions = await Promise.all(positionsPromises);
      setAdressesOpenTodos((prevPosition) => [...prevPosition, ...positions]);
    } catch (error) {
      console.error("Error geocoding addresses: ", error);
    }
  };
  const convertAddressToPosition = async (address) => {
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

  return (
    <>
      {adressesOpenTodos.map((adress, index) => (
        <AdvancedMarker key={index} position={adress}>
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

export default ShowPinsOfTodos;
