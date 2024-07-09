import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./TodoOrganizer.css";
import { DropdownItem } from "react-bootstrap";

// use img files instead of emojis in SortButtons
// import ArrowUp from '../../../../public/Images/Pfeil_Dropdown.png';
// import ArrowDown from '../../../../public/Images/Pfeil_Dropdown.png';

const TodoOrganizer = ({
  todos,
  onSort,
  activeTab,
  filterByStatus,
  filterByCity,
  filterByPostcode,
}) => {
  const [sortDirection, setSortDirection] = useState({
    createdAt: "asc",
    expiresAt: "asc",
    distance: "asc",
  });
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [city, setCity] = useState([]);
  const [postcodes, setPostcodes] = useState([]);
  const [status, setStatus] = useState([]);

  // handle SortDirection (asc or desc):
  const handleSort = (type) => {
    const newSortOrder = sortDirection[type] === "asc" ? "desc" : "asc";
    setSortDirection({
      ...sortDirection,
      [type]: newSortOrder,
    });
    onSort(type, newSortOrder);
  };

  // get Cities for Dropdown:
  // const getAllCities = () => {
  //   todos.forEach((todo) => {
  //     if (todo.userOffered.address.city) {
  //       const cityArray = todo.userOffered.address.city
  //         .split(",")
  //         .map((city) => city.trim());
  //       cityArray.forEach((city) => {
  //         setCity((prevCities) => new Set([...prevCities, city]));
  //       });
  //       console.log("cityArray: " + prevCities);
  //     }
  //   });
  // };

  // get Cities for Dropdown - version chatGPT:
  const getAllCities = () => {
    const citySet = new Set();
    todos.forEach((todo) => {
      if (
        todo.userOffered &&
        todo.userOffered.address &&
        todo.userOffered.address.city
      ) {
        const cityArray = todo.userOffered.address.city
          .split(",")
          .map((city) => city.trim());
        cityArray.forEach((city) => {
          citySet.add(city);
        });
      }
    });
    setCity([...citySet]);
  };

  // get Postcodes for Dropdown:
  const getAllPostcodes = () => {
    const postcodeSet = new Set();
    todos.forEach((todo) => {
      if (
        todo.userOffered &&
        todo.userOffered.address &&
        todo.userOffered.address.postalCode
      ) {
        const postcodeArray = todo.userOffered.address.postalCode
          .split(",")
          .map((postcode) => postcode.trim());
        postcodeArray.forEach((postcode) => {
          postcodeSet.add(postcode);
        });
      }
    });
    setPostcodes([...postcodeSet]);
  };

  // get Statuses for Dropdown:
  const getAllStatuses = () => {
    const statusSet = new Set();
    todos.forEach((todo) => {
      if (todo.status) {
        const statusArray = todo.status.split(",");
        statusArray.forEach((status) => {
          statusSet.add(status);
        });
      }
    });
    setStatus([...statusSet]);
  };

  // handle filter Status - not yet
  // const handleFilterByStatus = (status) => {
  //   setSelectedStatus(status);
  //   filterByStatus(status);
  // };

  return (
    <div className="organizer-bar">
      <span>
        SORTIEREN:
        <button
          className="organizer-button"
          onClick={() => handleSort("createdAt")}
        >
          erstellt am/um{" "}
          <span className="arrows">
            {sortDirection.createdAt === "asc" ? "⬇️" : "⬆️"}
          </span>
          {/* use img files instead of emojis in SortButtons
          erstellt am/um <img src={sortDirection.createdAt === "asc" ? ArrowUp : ArrowDown} alt="arrow" /> */}
        </button>
        <button
          className="organizer-button"
          onClick={() => handleSort("expiresAt")}
        >
          verfällt am/um {sortDirection.expiresAt === "asc" ? "⬇️" : "⬆️"}
        </button>
        {activeTab !== "myTodos" && (
          <button
            className="organizer-button"
            onClick={() => handleSort("distance")}
          >
            Distanz {sortDirection.distance === "asc" ? "⬇️" : "⬆️"}
          </button>
        )}
      </span>
      <span>
        FILTERN:
        {activeTab !== "myTodos" && (
          <>
            {/* DROPDOWN City */}
            <select
              className="organizer-button"
              defaultValue=""
              onFocus={getAllCities} // Call getAllCities when the dropdown is focused
              onChange={(e) => filterByCity(e.target.value)} // Trigger filterByCity on selection
            >
              <option value="" disabled hidden>
                Stadt
              </option>
              <option value="none">kein Filter</option>
              {[...city].map((city) => (
                <option className="option-container" key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* DROPDOWN PostalCode */}
            <select
              className="organizer-button"
              defaultValue=""
              onFocus={getAllPostcodes}
              onChange={(e) => filterByPostcode(e.target.value)}
            >
              <option value="" disabled hidden>
                PLZ
              </option>
              <option value="none">kein Filter</option>
              {[...postcodes].map((postcodes) => (
                <option
                  className="option-container"
                  key={postcodes}
                  value={postcodes}
                >
                  {postcodes}
                </option>
              ))}
            </select>
          </>
        )}
        {/* DROPDOWN Status */}
        {activeTab !== "openTodos" && (
          <select
            className="organizer-button"
            defaultValue=""
            onFocus={getAllStatuses}
            onChange={(e) => filterByStatus(e.target.value)}
          >
            <option value="" disabled hidden>
              Status
            </option>
            <option value="none">kein Filter</option>
            {[...status].map((status) => (
              <option className="option-container" key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      </span>
    </div>
  );
};

export default TodoOrganizer;
