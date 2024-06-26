import React, { useRef, useEffect, useState } from "react";
import "./TodoFilter.css";

const TodoFilter = () => {
  const [validTodos, setValidTodos] = useState([]);
  const [postalCodes, setPostalCodes] = useState([])
  const [city, setCity] = useState([])
  const [distances, setDistances] = useState([])


  const [pickUpStation, setPickUpStation] = useState([]);


  console.log(validTodos);

  
  const getAllPostalCodes = (data) => {
    data.forEach((todo) => {
      if(todo.userOffered.address.postalCode){
        const postalCodeArray = todo.userOffered.address.postalCode.split(",").map((postCode) => postCode.trim())
        postalCodeArray.forEach((postCode) => {
          setPostalCodes(
            (prevPostalCodes) => new Set([...prevPostalCodes, postCode])
          )
        })
        
      }
    })
  }

  const getAllCities = (data) => {
    data.forEach((todo) => {
      if(todo.userOffered.address.city) {
        const cityArray = todo.userOffered.address.city.split(",").map((city) => city.trim())
        cityArray.forEach((city) => {
          setCity((prevCities) =>  new Set([...prevCities, city]))
        })
      }
    })

  }
  
  const getAllDistances = (data) =>{
    console.log("Distances")
  }
  
  const getMyTodos = (data) => {
    // validTodos.forEach((todo) => {
      
      // })
  }
    
  const getAllPickUpStations = (data) => {
    data.forEach((todo) => {
      if (todo.location) {
        const pickUpStationsArray = todo.location
          .split(",")
          .map((loc) => loc.trim());
        pickUpStationsArray.forEach((pickUpStation) => {
          setPickUpStation(
            (prevPickUpStations) => new Set([...prevPickUpStations, pickUpStation])
          );
        });
      }
    });
  };


  const fetchValidTodos = async () => {
    try {
      const localToken = localStorage.getItem("token");
      // const localUser = localStorage.getItem(credentials.username);

      // console.log(localUser)
      const response = await fetch("http://localhost:8081/api/todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localToken,
        },
      });

      const data = await response.json();
      setValidTodos(data);
      

      getAllPostalCodes(data);
      getAllCities(data)
      getAllDistances(data);
      getMyTodos(data);
      getAllPickUpStations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchValidTodos();
  }, []);

  return (
    <div className="login-card">
      <form className="singIn-Form">
        <div className="input-Container-login">
          <div className="input-with-icon-login">
            <select
              className="input-Field-login"
              icon={`../../../../public/Images/Pfeil_Dropdown.png`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Postleitzahl
              </option>
              {[...postalCodes].map((postCode) => (
                <option
                  className="option-container"
                  key={postCode}
                  value={postCode}
                >
                  {postCode}
                </option>
              ))}
            </select>
          </div>
          <div className="input-with-icon-login">
            <select
              className="input-Field-login"
              icon={`../../../../public/Images/Pfeil_Dropdown.png`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Stadt
              </option>
              {[...city].map((city) => (
                <option className="option-container" key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="input-with-icon-login">
            <select
              className="input-Field-login"
              icon={`../../../../public/Images/Pfeil_Dropdown.png`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Distanz
              </option>
              {validTodos.map((todo) => (
                <option
                  className="option-container"
                  key={todo.todoId}
                  value={todo.userOffered.address.city}
                >
                  {todo.userOffered.address.city}
                </option>
              ))}
            </select>
          </div>
          <div className="input-with-icon-login">
            <select
              className="input-Field-login"
              icon={`../../../../public/Images/Pfeil_Dropdown.png`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Meine Todos
              </option>
              {validTodos.map((todo) => (
                <option
                  className="option-container"
                  key={todo.todoId}
                  value={todo.userOffered.address.city}
                >
                  {todo.userOffered.address.city}
                </option>
              ))}
            </select>
          </div>
          <div className="input-with-icon-login">
            <select
              className="input-Field-login"
              icon={`../../../../public/Images/Pfeil_Dropdown.png`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Angenommene Todos
              </option>
              {validTodos.map((todo) => (
                <option
                  className="option-container"
                  key={todo.todoId}
                  value={todo.userOffered.address.city}
                >
                  {todo.userOffered.address.city}
                </option>
              ))}
            </select>
          </div>
          <div className="input-with-icon-login">
            <select
              className="input-Field-login"
              icon={`../../../../public/Images/Pfeil_Dropdown.png`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Abholstation
              </option>
              {[...pickUpStation].map((pickUpStation) => (
                <option
                  className="option-container"
                  key={pickUpStation}
                  value={pickUpStation}
                >
                  {pickUpStation}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoFilter;
