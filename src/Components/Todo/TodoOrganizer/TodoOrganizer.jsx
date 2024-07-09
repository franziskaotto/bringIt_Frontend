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
  filterByPostalCode,
}) => {
  const [sortDirection, setSortDirection] = useState({
    createdAt: "asc",
    expiresAt: "asc",
    distance: "asc",
  });
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPostcode, setSelectedPostcode] = useState("");
  const [city, setCities] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // handle SortDirection (asc or desc):
  const handleSort = (type) => {
    const newSortOrder = sortDirection[type] === "asc" ? "desc" : "asc";
    setSortDirection({
      ...sortDirection,
      [type]: newSortOrder,
    });
    onSort(type, newSortOrder);
  };

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
    setCities([...citySet]);
  };

  // get PostalCodes for Dropdown:
  const getAllPostalCodes = () => {
    const postalCodeSet = new Set();
    todos.forEach((todo) => {
      if (
        todo.userOffered &&
        todo.userOffered.address &&
        todo.userOffered.address.postalCode
      ) {
        const postalCodeArray = todo.userOffered.address.postalCode
          .split(",")
          .map((postalCode) => postalCode.trim());
        postalCodeArray.forEach((postcode) => {
          postalCodeSet.add(postcode);
        });
      }
    });
    setPostalCodes([...postalCodeSet]);
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
    setStatuses([...statusSet]);
  };

  // handle filter by City
  const handleFilterByCity = (value) => {
    setSelectedCity(value);
    setSelectedPostcode("");
    setSelectedStatus("");
    filterByCity(value);
  };

  // handle filter by PostalCode
  const handleFilterByPostalCode = (value) => {
    setSelectedCity("");
    setSelectedPostcode(value);
    setSelectedStatus("");
    filterByPostalCode(value);
  };

  // handle filter by Status
  const handleFilterByStatus = (value) => {
    setSelectedCity("");
    setSelectedPostcode("");
    setSelectedStatus(value);
    filterByStatus(value);
  };

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
          verfällt am/um
          <span className="arrows">
            {sortDirection.expiresAt === "asc" ? "⬇️" : "⬆️"}
          </span>
        </button>
        {activeTab !== "myTodos" && (
          <button
            className="organizer-button"
            onClick={() => handleSort("distance")}
          >
            Distanz
            <span className="arrows">
              {sortDirection.distance === "asc" ? "⬇️" : "⬆️"}
            </span>
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
              value={selectedCity}
              onFocus={getAllCities} // Call getAllCities when the dropdown is focused
              onChange={(e) => handleFilterByCity(e.target.value)} // Trigger filterByCity on selection
            >
              <option value="" disabled hidden>
                Stadt
              </option>
              <option className="kein-filter-option" value="">
                Alle
              </option>
              {[...city].map((city) => (
                <option className="option-container" key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* DROPDOWN PostalCode */}
            <select
              className="organizer-button"
              value={selectedPostcode}
              onFocus={getAllPostalCodes}
              onChange={(e) => handleFilterByPostalCode(e.target.value)}
            >
              <option value="" disabled hidden>
                PLZ
              </option>
              <option className="kein-filter-option" value="">
                Alle
              </option>
              {[...postalCodes].map((postcodes) => (
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
            value={selectedStatus}
            onFocus={getAllStatuses}
            onChange={(e) => handleFilterByStatus(e.target.value)}
          >
            <option value="" disabled hidden>
              Status
            </option>
            <option className="kein-filter-option" value="">
              Alle
            </option>
            {[...statuses].map((status) => (
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
