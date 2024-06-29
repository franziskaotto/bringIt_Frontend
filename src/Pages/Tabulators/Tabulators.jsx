import React, { useState } from "react";
import "./Tabulators.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import TodoFilter from "../../Components/TodoFilter";
import CreateTodo from "../../Components/Todo/CreateTodo";
import MyTodos from "../../Components/Todo/MyTodos";

const Tabulators = () => {
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
         
        </Tabs>
      </div>
    </>
  );
};

export default Tabulators;
