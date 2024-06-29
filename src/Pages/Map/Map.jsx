import React, { useEffect, useState } from "react";
import "./Map.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import TodoFilter from "../../Components/TodoFilter";
import CreateTodo from "../../Components/Todo/CreateTodo";
import MyTodos from "../../Components/Todo/MyTodos";
import OpenTodos from "../OpenTodos";
import AcceptedTodos from "../AcceptedTodos";

const Map = () => {
  console.log("hallo")
  const [key, setKey] = useState("map");
  const [activeTab, setActiveTab] = useState("")

  const handleTabSelect = (k) => {
    setKey(k);
    if (k !== "map") {
      setKey(k)
      setActiveTab(k);
    } else {
      setKey(k)
    }
    console.log("Active tab:", activeTab);
  };
  
  useEffect(() => {
    console.log("Active tab:", activeTab);
  }, [activeTab]);



  
  console.log(key)
  console.log(activeTab)

  return (
    <>
      <div className="left-side-content-map">
        <Tabs id="uncontrolled-tab-example" activeKey={key} onSelect={handleTabSelect} className="mb-3">
          <Tab eventKey="map" title="Map">
            <div className="map-and-filter-container">
              <GoogleMaps />
              <TodoFilter />
            </div>
          </Tab>
          <Tab eventKey="createTodo" title="Todo erstellen">
            <CreateTodo activeTab={activeTab} />
          </Tab>
          <Tab eventKey="myTodos" title="Meine Todos">
            <MyTodos />
          </Tab>
          <Tab eventKey="openTodos" title="Offene Todos">
            <OpenTodos />
          </Tab>
          <Tab eventKey="acceptedTodos" title="angenommene Todos">
            <AcceptedTodos />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Map;
