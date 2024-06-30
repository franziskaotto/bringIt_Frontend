import React, { useState } from "react";
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

  console.log("key: " + key);

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
            <CreateTodo />
          </Tab>
          <Tab eventKey="myTodos" title="Meine Todos">
            <MyTodos activeTab={key} />
          </Tab>
          <Tab eventKey="openTodos" title="Offene Todos">
            <OpenTodos activeTab={key} setExpandedTodo={setExpandedTodo} expandedTodo={expandedTodo} />
          </Tab>
          <Tab eventKey="acceptedTodos" title="angenommene Todos">
            <AcceptedTodos activeTab={key} setExpandedTodo={setExpandedTodo} expandedTodo={expandedTodo} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Map;
