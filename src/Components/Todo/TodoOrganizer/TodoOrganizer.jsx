import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./TodoOrganizer.css";
import { DropdownItem } from "react-bootstrap";

const TodoOrganizer = ({
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

  const handleSort = (type) => {
    const newSortOrder = sortDirection[type] === "asc" ? "desc" : "asc";
    setSortDirection({
      ...sortDirection,
      [type]: newSortOrder,
    });
    onSort(type, newSortOrder);
  };

  const handleFilterByStatus = (status) => {
    setSelectedStatus(status);
    filterByStatus(status);
  };

  return (
    <div className="organizer-bar">
      <span>
        SORTIEREN:
        <button
          className="organizer-button"
          onClick={() => handleSort("createdAt")}
        >
          erstellt am/um {sortDirection.createdAt === "asc" ? "⬆️" : "⬇️"}
        </button>
        <button
          className="organizer-button"
          onClick={() => handleSort("expiresAt")}
        >
          verfällt am/um {sortDirection.expiresAt === "asc" ? "⬆️" : "⬇️"}
        </button>
        {activeTab !== "myTodos" && (
          <button
            className="organizer-button"
            onClick={() => handleSort("distance")}
          >
            Distanz {sortDirection.distance === "asc" ? "⬆️" : "⬇️"}
          </button>
        )}
      </span>
      <span>
        FILTERN:
        {activeTab !== "myTodos" && (
          <>
            {/* <button className="organizer-button">Stadt ▼</button> */}
            <select className="organizer-button" defaultValue="">
              <option value="" disabled hidden>
                Stadt
              </option>
              <option value="none">No filter</option>
              {[...city].map((city) => (
                <option className="option-container" key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <button className="organizer-button">PLZ</button>
          </>
        )}
        {activeTab !== "openTodos" && (
          // <button className="organizer-button">Status ▼</button>
          <DropdownButton
            id="dropdown-status"
            title={`Status: {selectStatus}`}
            onSelect={handleFilterByStatus}
            className="organizer-button"
          >
            <Dropdown.Item eventKey="All">Alle</Dropdown.Item>
            <Dropdown.Item eventKey="Offen">Offen</Dropdown.Item>
            <Dropdown.Item eventKey="In Arbeit">In Arbeit</Dropdown.Item>
            <Dropdown.Item eventKey="Erledigt">Erledigt</Dropdown.Item>
            <Dropdown.Item eventKey="Abgelaufen">Abgelaufen</Dropdown.Item>
          </DropdownButton>
        )}
      </span>
    </div>
  );
};

export default TodoOrganizer;
