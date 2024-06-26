import React, { useState } from "react";
import "./Map.css";


import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TomTomMap from "../../TomTomMap";
import GoogleMaps from "../../GoogleMaps";
import OpenTodos from "../../Todo/CreateTodo";
import CreateTodo from "../../Todo/CreateTodo";
import MyTodos from "../../Todo/MyTodos";

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
            <GoogleMaps />
          </Tab>
          <Tab eventKey="todo" title="Todo erstellen">
            <CreateTodo />
          </Tab>
          <Tab eventKey="mytodo" title="Meine todos">
            <MyTodos />
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
