import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import "./Tabulators.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GoogleMaps from "../../Components/GoogleMaps";
import TodoFilter from "../../Components/Todo/TodoFilter";
import CreateTodo from "../../Components/Todo/CreateTodo";
import MyTodos from "../../Components/Todo/MyTodos";
import OpenTodos from "../../Components/Todo/OpenTodos";
import AcceptedTodos from "../../Components/Todo/AcceptedTodos";
import { bringItsState } from "../../state/bringItsState";

const Tabulators = () => {
  const [key, setKey] = useState("map");
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [openTodos, setOpenTodos] = useState([]);
  const [acceptedTodos, setAcceptedTodos] = useState([]);
  const [myTodos, setMyTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Initialize with null
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [bringIts, setBringIts] = useRecoilState(bringItsState);

  const tabBarRef = useRef(null);
  const [scroll, setScroll] = useState(false);

  // fetch todos onChange of activeKey according to specific key.
  useEffect(() => {
    if (key === "myTodos") {
      fetchMyTodos();
    }
    if (key === "openTodos") {
      fetchOpenTodos();
    }
    if (key === "acceptedTodos") {
      fetchAcceptedTodos();
    }
  }, [key]);

  // fetch MyTodos
  const fetchMyTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/todo/offeredByUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMyTodos(data);
        fetchCurrentUser();
      } else {
        console.error("Failed to fetch MyTodos");
        console.log(response);
        //console.log(username);
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
        fetchCurrentUser();
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
    try {
      const response = await fetch(
        `http://localhost:8081/api/todo/takenByUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAcceptedTodos(data);
        fetchCurrentUser();
      } else {
        console.error("Failed to fetch AcceptedTodos");
        setErrorMessage("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching AcceptedTodos: ", error);
      setErrorMessage("Error fetching AcceptedTodos");
    }
  };

  // fetch current user:
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user data: ", data); // Log the fetched data
        setCurrentUser(data);
        setBringIts(data.user.bringIts); // Properly call the setter function
      } else {
        console.error("Failed to fetch User");
        console.log("response: " + response);
        setErrorMessage("Failed to fetch User " + userId);
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
      setErrorMessage("Error fetching User");
    }
  };

  const handleStickyTabs = () => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 85);
    });
  };

  // call fetchCurrentUser on componentMount so that bringIts in Navbar are displayed:
  useEffect(() => {
    fetchCurrentUser();
    handleStickyTabs();
  }, []);

  return (
    <>
      <div className="content-tabulators">
        <Tabs
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className={`mb-3 ${scroll ? `-sticky` : ""}`}
        >
          <Tab eventKey="map" title="Map">
            <div className="map-and-filter-container">
              <GoogleMaps />
              <TodoFilter />
            </div>
          </Tab>
          <Tab eventKey="createTodo" title="Todo erstellen">
            <CreateTodo />
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
          <Tab eventKey="acceptedTodos" title="Angenommene Todos">
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

export default Tabulators;
