import React, { useEffect, useState, Component } from "react";
import { useRecoilState } from "recoil";
import "./Tabulators.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GoogleMaps from "../../Components/GoogleMaps";
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
  const [originalOpenTodos, setOriginalOpenTodos] = useState([]);
  const [acceptedTodos, setAcceptedTodos] = useState([]);
  const [originalAcceptedTodos, setOriginalAcceptedTodos] = useState([]);
  const [myTodos, setMyTodos] = useState([]);
  const [originalMyTodos, setOriginalMyTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [
    tabChangeByHandleShowTodoExpanded,
    setTabChangeByHandleShowTodoExpanded,
  ] = useState(false);

  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [bringIts, setBringIts] = useRecoilState(bringItsState);

  const googleMapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapsId = import.meta.env.VITE_MAPS_ID;

  // fetch todos onChange of activeKey according to specific key.
  useEffect(() => {
    if (!tabChangeByHandleShowTodoExpanded) {
      if (key === "map") {
        fetchOpenTodos();
        fetchAcceptedTodos();
      }
      if (key === "myTodos") {
        fetchMyTodos();
      }
      if (key === "openTodos") {
        fetchOpenTodos();
      }
      if (key === "acceptedTodos") {
        fetchAcceptedTodos();
      }
    } else {
      // Reset the flag after handling the tab change
      setTabChangeByHandleShowTodoExpanded(false);
    }
  }, [key]);

  // fetch current user (async version)
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

  // ?? SCROLL-STICKY TRYOUT until 14.7.
  // const handleStickyTabs = () => {
  //   window.addEventListener("scroll", () => {
  //     setScroll(window.scrollY > 85);
  //   });
  // };

  // call fetchCurrentUser on componentMount so that bringIts in Navbar are displayed:
  useEffect(() => {
    fetchCurrentUser();
    // handleStickyTabs();
  }, []);

  // useEffect to fetch OpenTodos and AcceptedTodos when currentUser changes
  // useEffect(() => {
  //   if (currentUser) {
  //     fetchOpenTodos();
  //     fetchAcceptedTodos();
  //   }
  // }, [currentUser]);

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
        setOriginalMyTodos(data); // Store the original myTodos for correct DropDown
        setMyTodos(data); // Set the current myTodos
        fetchCurrentUser();
        setErrorMessage(""); // Clear any previous error message
      } else {
        console.error("Failed to fetch MyTodos");
        console.log(response);
        setErrorMessage("Failed to fetch MyTodos");
      }
    } catch (error) {
      console.error("Error fetching MyTodos:", error);
    }
  };

  // fetch OpenTodos -> not expired, Status: "Offen":
  const fetchOpenTodos = async () => {
    try {
      // Check if currentUser is defined
      if (currentUser) {
        console.warn(
          "Current user is not defined. OpenTodos will not be fetched."
        );
        return;
      }

      const response = await fetch("http://localhost:8081/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Filter todos based on userId -> remove todos by this user
        const todos = data.filter((todo) => todo.userOffered.userId !== userId);
        setOriginalOpenTodos(todos);

        // Fetch distances for the todos
        const distances = await fetchDistances(todos);

        // Combine the todos with their distances
        const todosWithDistances = todos.map((todo) => {
          const distanceData = distances.find((d) => d.todoId === todo.todoId);

          return {
            ...todo,
            distance: distanceData ? distanceData.distance : null,
          };
        });

        setOpenTodos(todosWithDistances);
        setErrorMessage(""); // Clear any previous error message
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

  // fetch OpenTodos by City:
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
        // Filter todos based on userId -> remove todos by this user
        const todos = data.filter((todo) => todo.userOffered.userId !== userId);
        setOpenTodos(todos);
      } else {
        console.error("Failed to fetch OpenTodos by City " + city);
        console.log("response: " + response);
        setErrorMessage("Failed to fetch OpenTodos by City " + city);
      }
    } catch (error) {
      console.error("Error fetching OpenTodosByCity: ", error);
      setErrorMessage("Error fetching OpenTodosByCity ", city);
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
        // Filter todos based on userId -> remove todos by this user
        const todos = data.filter((todo) => todo.userOffered.userId !== userId);
        setOpenTodos(todos);
      } else {
        console.error("Failed to fetch OpenTodos by PostalCode " + postalCode);
        console.log("response: " + response);
        setErrorMessage(
          "Failed to fetch OpenTodos by PostalCode " + postalCode
        );
      }
    } catch (error) {
      console.error("Error fetching OpenTodosByPostalCode: ", error);
      setErrorMessage("Error fetching OpenTodosByPostalCode ", postalCode);
    }
  };

  // fetch AcceptedTodos (by User Taken):
  const fetchAcceptedTodos = async () => {
    // Check if currentUser is defined
    if (!currentUser) {
      console.warn(
        "Current user is not defined. AcceptedTodos will not be fetched."
      );
      return;
    }

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
        // Filter todos based on userId -> remove todos by this user
        const todos = data.filter((todo) => todo.userOffered.userId !== userId);
        setOriginalAcceptedTodos(todos); // Store the original acceptedTodos

        // Fetch distances for the todos
        const distances = await fetchDistances(todos);

        // Combine the todos with their distances
        const todosWithDistances = todos.map((todo) => {
          const distanceData = distances.find((d) => d.todoId === todo.todoId);

          return {
            ...todo,
            distance: distanceData ? distanceData.distance : null,
          };
        });

        setAcceptedTodos(todosWithDistances);
        setErrorMessage(""); // Clear any previous error message
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
    if (status === "") {
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
    if (city === "") {
      fetchOpenTodos();
    } else {
      fetchOpenTodosByCity(city);
    }
  };

  // handle Filter OpenTodos by PostalCode:
  const handleFilterOpenTodosByPostalCode = (postalCode) => {
    if (postalCode === "") {
      fetchOpenTodos();
    } else {
      fetchOpenTodosByPostalCode(postalCode);
    }
  };

  // handle Filter AcceptedTodos by City;
  const handleFilterAcceptedTodosByCity = (city) => {
    if (city === "") {
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
    if (postalCode === "") {
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
    if (status === "") {
      await fetchAcceptedTodos();
    } else {
      const filteredTodos = originalAcceptedTodos.filter(
        (todo) => todo.status === status
      );
      setAcceptedTodos(filteredTodos);
    }
  };

  // Function to fetch distances from Google-Matrix-API (version with DistanceMatrixServic)
  const fetchDistances = (todos) => {
    return new Promise((resolve, reject) => {
      if (!currentUser) {
        reject("Current user is not defined");
        return;
      }

      const destinations = todos.map(
        (todo) =>
          `${todo.userOffered.address.streetNumber} ${todo.userOffered.address.postalCode} ${todo.userOffered.address.city}`
      );

      const origin = `${currentUser.user.address.streetNumber} ${currentUser.user.address.postalCode} ${currentUser.user.address.city}`;

      // Use DistanceMatrixService to get distances
      new window.google.maps.DistanceMatrixService().getDistanceMatrix(
        {
          origins: [origin],
          destinations: destinations,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },

        (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            const distances = response.rows[0].elements.map(
              (element, index) => ({
                todoId: todos[index].todoId,
                distance: element.distance ? element.distance.value : null,
              })
            );
            resolve(distances);
          } else {
            console.error("Error fetching distances: ", status);
            reject(status);
          }
        }
      );
    });
  };

  // handle show todo expanded in openTodos
  const handleShowTodoExpanded = async (todoId, TodoStatus) => {
    setTabChangeByHandleShowTodoExpanded(true);

    // filter the searched todo and the rest:
    let filteredTodo;
    let residueTodos;
    if (TodoStatus === "Offen") {
      filteredTodo = originalOpenTodos.filter((todo) => todo.todoId === todoId);
      residueTodos = originalOpenTodos.filter((todo) => todo.todoId !== todoId);
    } else {
      filteredTodo = originalAcceptedTodos.filter(
        (todo) => todo.todoId === todoId
      );
      residueTodos = originalAcceptedTodos.filter(
        (todo) => todo.todoId !== todoId
      );
    }

    // sort todos (1. filteredTodo, 2. residueTodos):
    const sortedTodos = [...filteredTodo, ...residueTodos];

    // add distances to sortedTodos
    const distances = await fetchDistances(sortedTodos);

    // Combine the sortedTodos with their distances
    const todosWithDistances = sortedTodos.map((todo) => {
      const distanceData = distances.find((d) => d.todoId === todo.todoId); // find only works with promises (async function)!

      return {
        ...todo,
        distance: distanceData ? distanceData.distance : null,
      };
    });

    // expand TodoListTemplate
    setExpandedTodo(todoId);

    if (TodoStatus === "Offen") {
      setOpenTodos(todosWithDistances);
      setKey("openTodos");
    } else {
      setAcceptedTodos(todosWithDistances);
      setKey("acceptedTodos");
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
          <Tab eventKey="map" title="Map" className="map-tab">
            <div className="map-and-filter-container">
              <GoogleMaps
                openTodos={originalOpenTodos}
                acceptedTodos={originalAcceptedTodos}
                handleShowTodoExpanded={handleShowTodoExpanded}
              />
            </div>
          </Tab>
          <Tab
            eventKey="createTodo"
            title="Todo erstellen"
            className="tab-panel"
          >
            <div className="content-container">
              <CreateTodo />
            </div>
          </Tab>
          <Tab eventKey="myTodos" title="Meine Todos" className="tab-panel">
            <div className="todo-organizer">
              <TodoOrganizer
                todos={originalMyTodos}
                onSort={handleSortMyTodos}
                activeTab={key}
                filterByStatus={handleFilterStatusMyTodos}
              />
            </div>
            <div className="content-container">
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
            </div>
          </Tab>
          <Tab eventKey="openTodos" title="Offene Todos" className="tab-panel">
            <div className="todo-organizer">
              <TodoOrganizer
                todos={originalOpenTodos}
                onSort={handleSortOpenTodos}
                filterByCity={handleFilterOpenTodsoByCity}
                filterByPostalCode={handleFilterOpenTodosByPostalCode}
                activeTab={key}
              />
            </div>
            <div className="content-container">
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
            </div>
          </Tab>
          <Tab
            eventKey="acceptedTodos"
            title="Angenommene Todos"
            className="tab-panel"
          >
            <div className="todo-organizer">
              <TodoOrganizer
                todos={originalAcceptedTodos}
                onSort={handleSortAcceptedTodos}
                activeTab={key}
                filterByCity={handleFilterAcceptedTodosByCity}
                filterByPostalCode={handleFilterAcceptedTodosByPostalCode}
                filterByStatus={handleFilterStatusAcceptedTodos}
              />
            </div>
            <div className="content-container">
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
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

// ?? VERS until 14.7. incl. SCROLL-STICKY TRYOUT
/*
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
              <GoogleMaps
                fetchOpenTodos={fetchOpenTodos}
                fetchAcceptedTodos={fetchAcceptedTodos}
              />
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
*/

export default Tabulators;
