import React, { useEffect, useState } from "react";
import "./Map.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import TodoFilter from "../../Components/TodoFilter";
import CreateTodo from "../../Components/Todo/CreateTodo/CreateTodo";
import MyTodos from "../../Components/Todo/MyTodos/MyTodos";
import OpenTodos from "../../Components/Todo/OpenTodos";
import AcceptedTodos from "../../Components/Todo/AcceptedTodos";

const Map = () => {
  const [key, setKey] = useState("map");
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [openTodos, setOpenTodos] = useState([]);
  const [acceptedTodos, setAcceptedTodos] = useState([]);
  const [myTodos, setMyTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"), 10);

  console.log("key: " + key);

  // fetch todos onChange of activeKey according to specific key.
  useEffect(() => {
    if (key === "myTodos") {
      fetchMyTodos();
    } else if (key === "openTodos") {
      fetchOpenTodos();
    } else if (key === "acceptedTodos") {
      fetchAcceptedTodos();
    }
  }, [key]);

  // fetch MyTodos
  const fetchMyTodos = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/todo/offeredByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMyTodos(data);
      } else {
        console.error("Failed to fetch MyTodos");
        console.log(response);
        console.log(username);
      }
    } catch (error) {
      console.error("Error fetching MyTodos:", error);
    }
  };

  // fetch All not expired Todos with Status "Offen":
  const fetchOpenTodos = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOpenTodos(data);
      } else {
        console.error("Failed to fetch OpenTodos");
        console.log("response: " + response);
        setErrorMessage("Failed to OpenTetch todos");
      }
    } catch (error) {
      console.error("Error fetching OpenTodos: ", error);
      setErrorMessage("Error fetching OpenTodos");
    }
  };

  // fetch Todos by User Taken (Accepted Todos):
  const fetchAcceptedTodos = async () => {
    console.log("userId for fetch: " + userId);

    try {
      const response = await fetch(`http://localhost:8081/api/todo/takenByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAcceptedTodos(data);
      } else {
        console.error("Failed to fetch AcceptedTodos");
        setErrorMessage("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching AcceptedTodos: ", error);
      setErrorMessage("Error fetching AcceptedTodos");
    }
  };

  return (
    <>
      <div className="left-side-content-map">
        <Tabs id="uncontrolled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="map" title="Map">
            <div className="map-and-filter-container">
              <GoogleMaps />
              <TodoFilter />
            </div>
          </Tab>
          <Tab eventKey="createTodo" title="Todo erstellen">
            <CreateTodo fetchMyTodos={fetchMyTodos} fetchOpenTodos={fetchOpenTodos} />
          </Tab>
          <Tab eventKey="myTodos" title="Meine Todos">
            <MyTodos
              activeTab={key}
              setExpandedTodo={setExpandedTodo}
              expandedTodo={expandedTodo}
              todos={myTodos}
              fetchMyTodos={fetchMyTodos}
              fetchOpenTodos={fetchOpenTodos}
              fetchAcceptedTodos={fetchAcceptedTodos}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Tab>
          <Tab eventKey="openTodos" title="Offene Todos">
            <OpenTodos
              activeTab={key}
              setExpandedTodo={setExpandedTodo}
              expandedTodo={expandedTodo}
              todos={openTodos}
              fetchMyTodos={fetchMyTodos}
              fetchOpenTodos={fetchOpenTodos}
              fetchAcceptedTodos={fetchAcceptedTodos}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Tab>
          <Tab eventKey="acceptedTodos" title="angenommene Todos">
            <AcceptedTodos
              activeTab={key}
              setExpandedTodo={setExpandedTodo}
              expandedTodo={expandedTodo}
              todos={acceptedTodos}
              fetchMyTodos={fetchMyTodos}
              fetchOpenTodos={fetchOpenTodos}
              fetchAcceptedTodos={fetchAcceptedTodos}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Map;
