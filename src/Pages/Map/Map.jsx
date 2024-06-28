import React, { useState } from "react";
import "./Map.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import TodoFilter from "../../Components/TodoFilter";
import CreateTodo from "../../Components/Todo/CreateTodo";
import MyTodos from "../../Components/Todo/MyTodos";
import OpenTodos from "../OpenTodos";

const Map = () => {
  const [key, setKey] = useState("map");

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
            <MyTodos />
          </Tab>
          <Tab eventKey="openTodos" title="Offene Todos">
            <OpenTodos />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Map;
