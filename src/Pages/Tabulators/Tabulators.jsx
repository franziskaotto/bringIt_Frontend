import React, { useEffect, useState } from "react";
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
import TodoOrganizer from "../../Components/Todo/TodoOrganizer";

const Tabulators = () => {
  const [key, setKey] = useState("map");
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [openTodos, setOpenTodos] = useState([]);
  const [acceptedTodos, setAcceptedTodos] = useState([]);
  const [originalAcceptedTodos, setOriginalAcceptedTodos] = useState([]);
  const [myTodos, setMyTodos] = useState([]);
  const [originalMyTodos, setOriginalMyTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Initialize with null
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [bringIts, setBringIts] = useRecoilState(bringItsState);

  console.log("key: " + key);

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
        setOriginalMyTodos(data); // Store the original myTodos
        setMyTodos(data); // Set the current myTodos
        fetchCurrentUser();
      } else {
        console.error("Failed to fetch MyTodos");
        console.log(response);
        setErrorMessage("Failed to fetch MyTodos");
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
        // Filter todos based on userId -> remove todos by this user
        const todos = data.filter((todo) => todo.userOffered.userId !== userId);
        setOpenTodos(todos);
        fetchCurrentUser();
      } else {
        console.error("Failed to fetch OpenTodos");
        console.log("response: " + response);
        setErrorMessage("Failed to fetch OpenTodos");
      }
    } catch (error) {
      console.error("Error fetching OpenTodos: ", error);
      setErrorMessage("Error fetching OpenTodos");
    }
  };

  // fetch openTodos by city:
  const fetchOpenTodosByCity = async (city) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/todo/city/${city}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOpenTodos(data);
      } else {
        console.error("Failed to fetch OpenTodosByCity " + city);
        console.log("response: " + response);
        setErrorMessage("Failed to fetch OpenTodosBy City " + city);
      }
    } catch (error) {
      console.error("Error fetching OpenTOdosByCity: ", error);
      setErrorMessage("Error fetching OpenTOdodsByCity ", city);
    }
  };

  // fetch OpenTodos by PostalCode:
  const fetchOpenTodosByPostalCode = async (postalCode) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/todo/postcode/${postalCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOpenTodos(data);
      } else {
        console.error("Failed to fetch OpenTodosByCity " + postalCode);
        console.log("response: " + response);
        setErrorMessage("Failed to fetch OpenTodosBy City " + postalCode);
      }
    } catch (error) {
      console.error("Error fetching OpenTOdosByCity: ", error);
      setErrorMessage("Error fetching OpenTOdodsByCity ", postalCode);
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
        setOriginalAcceptedTodos(data); // Store the original acceptedTodos
        setAcceptedTodos(data);
        fetchCurrentUser();
      } else {
        console.error("Failed to fetch AcceptedTodos");
        setErrorMessage("Failed to fetch AcceptedTodos");
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

  // call fetchCurrentUser on componentMount so that bringIts in Navbar are displayed:
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // handle Sort MyTodos:
  const handleSortMyTodos = (type, order) => {
    const sortedTodos = [...myTodos].sort((a, b) => {
      if (type === "createdAt") {
        return order === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (type === "expiresAt") {
        return order === "asc"
          ? new Date(a.expiresAt) - new Date(b.expiresAt)
          : new Date(b.expiresAt) - new Date(a.expiresAt);
      } else if (type === "distance") {
        return order === "asc"
          ? a.distance - b.distance
          : b.distance - a.distance;
      }
      return 0;
    });
    setMyTodos(sortedTodos);
  };

  // handle Sort OpenTodos:
  const handleSortOpenTodos = (type, order) => {
    const sortedTodos = [...openTodos].sort((a, b) => {
      if (type === "createdAt") {
        return order === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (type === "expiresAt") {
        return order === "asc"
          ? new Date(a.expiresAt) - new Date(b.expiresAt)
          : new Date(b.expiresAt) - new Date(a.expiresAt);
      } else if (type === "distance") {
        return order === "asc"
          ? a.distance - b.distance
          : b.distance - a.distance;
      }
      return 0;
    });
    setOpenTodos(sortedTodos);
  };

  // handle Sort AcceptedTodos:
  const handleSortAcceptedTodos = (type, order) => {
    const sortedTodos = [...acceptedTodos].sort((a, b) => {
      if (type === "createdAt") {
        return order === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (type === "expiresAt") {
        return order === "asc"
          ? new Date(a.expiresAt) - new Date(b.expiresAt)
          : new Date(b.expiresAt) - new Date(a.expiresAt);
      } else if (type === "distance") {
        return order === "asc"
          ? a.distance - b.distance
          : b.distance - a.distance;
      }
      return 0;
    });
    setAcceptedTodos(sortedTodos);
  };

  // handle Filter MyTodos by Status:
  const handleFilterStatusMyTodos = async (status) => {
    if (status === "none") {
      await fetchMyTodos();
    } else {
      const filteredTodos = originalMyTodos.filter(
        (todo) => todo.status === status
      );
      setMyTodos(filteredTodos);
    }
  };

  // handle Filter OpenTodos by City:
  const handleFilterOpenTodsoByCity = (city) => {
    if (city === "none") {
      fetchOpenTodos();
    } else {
      fetchOpenTodosByCity(city);
    }
  };

  // handle Filter OpenTodos by PostalCode:
  const handleFilterOpenTodosByPostalCode = (postalCode) => {
    if (postalCode === "none") {
      fetchOpenTodos();
    } else {
      fetchOpenTodosByPostalCode(postalCode);
    }
  };

  // handle Filter AcceptedTodos by City;
  const handleFilterAcceptedTodosByCity = (city) => {
    if (postalCode === "none") {
      fetchAcceptedTodos();
    } else {
      const filteredTodos = originalAcceptedTodos.filter(
        (todo) => todo.userOffered.address.city.trim() === city
      );
      setAcceptedTodos(filteredTodos);
    }
  };

  // handle Filter AcceptedTodos by PostalCode:
  const handleFilterAcceptedTodosByPostalCode = (postalCode) => {
    if (postalCode === "none") {
      fetchAcceptedTodos();
    } else {
      const filteredTodos = originalAcceptedTodos.filter(
        (todo) => todo.userOffered.address.postalCode.trim() === postalCode
      );
      setAcceptedTodos(filteredTodos);
    }
  };

  // handle Filter AcceptedTodos by Status:
  const handleFilterStatusAcceptedTodos = async (status) => {
    if (status === "none") {
      await fetchAcceptedTodos();
    } else {
      const filteredTodos = originalAcceptedTodos.filter(
        (todo) => todo.status === status
      );
      setAcceptedTodos(filteredTodos);
    }
  };

  return (
    <>
      <div className="left-side-content-map">
        <Tabs
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
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
            <TodoOrganizer
              todos={myTodos}
              onSort={handleSortMyTodos}
              activeTab={key}
              filterByStatus={handleFilterStatusMyTodos}
            />
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
            <TodoOrganizer
              todos={openTodos}
              onSort={handleSortOpenTodos}
              filterByCity={handleFilterOpenTodsoByCity}
              filterByPostcode={handleFilterOpenTodosByPostalCode}
              activeTab={key}
            />
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
            <TodoOrganizer
              todos={acceptedTodos}
              onSort={handleSortAcceptedTodos}
              activeTab={key}
              filterByCity={handleFilterAcceptedTodosByCity}
              filterByPostcode={handleFilterAcceptedTodosByPostalCode}
              filterByStatus={handleFilterStatusAcceptedTodos}
            />
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
