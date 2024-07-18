/* eslint-disable react/prop-types */
import { useState } from "react";
import TodoTemplateButton from "./TodoTemplateButton";
import Tooltip from "./Tooltip.jsx";
import PropTypes from "prop-types";
import "./Tooltip.css";
import "./Todos.css";

const TodoListTemplate = ({
  todo,
  activeTab,
  setExpandedTodo,
  expandedTodo,
  fetchMyTodos,
  fetchOpenTodos,
  fetchAcceptedTodos,
  setErrorMessage,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const userId = parseInt(localStorage.getItem("userId"), 10);
  let tooltipTimer; // To store the timer ID

  // State variables for handling editing
  const [editValues, setEditValues] = useState({
    title: todo.title,
    location: todo.location,
    description: todo.description,
    addInfo: todo.addInfo,
    expiresAt: todo.expiresAt,
  });

  const [isEditing, setIsEditing] = useState(false);

  // handle expand or collapse of todo details
  const handleToggle = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  // Update Todo Status
  const handleStatusChange = async (todoId, makeStatus) => {
    const token = localStorage.getItem("token");
    const userTakenId = userId;

    try {
      console.log("Sending PATCH request with: ", {
        todoId: todoId,
        userTakenId: userTakenId,
        status: makeStatus,
      });

      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId,
          userTakenId: userTakenId,
          status: makeStatus,
        }),
      });

      if (response.ok) {
        console.log(`Status of Todo ${todoId} updated to ${makeStatus}`);
        if (activeTab === "acceptedTodos") {
          fetchAcceptedTodos();
        } else if (activeTab === "openTodos") {
          fetchOpenTodos();
        }
      } else {
        const errorData = await response.json();
        console.error(`Failed to update TodoStatus: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage);
      }
    } catch (error) {
      console.error(`Error updating TodoStatus: `, error);
      setErrorMessage("Error updating TodoStatus");
    }
  };

  // Set Todo Completed for MyTodo
  const handleMyTodoCompleted = async (todo) => {
    const token = localStorage.getItem("token");
    const todoId = todo.todoId;
    const userTakenId = todo.userTaken.userId;
    const makeStatus = "Erledigt";

    try {
      console.log("Sending PATCH request with: ", {
        todoId: todoId,
        userTakenId: userTakenId,
        status: makeStatus,
      });

      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId,
          userTakenId: userTakenId,
          status: makeStatus,
        }),
      });

      if (response.ok) {
        console.log(`Status of Todo ${todoId} updated to ${makeStatus}`);
        fetchMyTodos();
      } else {
        const errorData = await response.json();
        console.error(`Failed to update TodoStatus: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage);
      }
    } catch (error) {
      console.error(`Error updating TodoStatus: `, error);
      setErrorMessage("Error updating TodoStatus");
    }
  };

  // Delete Todo
  const handleCancel = async (todoId) => {
    const token = localStorage.getItem("token");
    const id = todoId;

    try {
      const response = await fetch(`http://localhost:8081/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Todo with id ${id} has been deleted`);
        // Refetch todos to update the list
        fetchMyTodos();
      } else {
        console.error(`Failed to delete todo with id ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting todo with id ${id}:`, error);
    }
  };

  // Handle editing
  const handleEdit = () => {
    // Set initial edit values from current todo
    setEditValues({
      title: todo.title,
      location: todo.location,
      description: todo.description,
      addInfo: todo.addInfo,
      expiresAt: todo.expiresAt,
    });

    setIsEditing(true);
  };

  // Handle cancel editing
  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  // Handle save edited todo
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    // Format the date to 'YYYY-MM-DDTHH:MM:SS' before sending to the server
    const formattedDate = new Date(editValues.expiresAt)
      .toISOString()
      .slice(0, 16);

    try {
      const response = await fetch(`http://localhost:8081/api/todo`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: todo.todoId, // Include the todoId in the request
          title: editValues.title,
          location: editValues.location,
          description: editValues.description,
          addInfo: editValues.addInfo,
          expiresAt: formattedDate, // Send formatted date
        }),
      });

      if (response.ok) {
        console.log(`Todo ${todo.todoId} updated successfully`);
        setIsEditing(false);
        fetchMyTodos(); // Refresh todos after successful update
      } else {
        const errorData = await response.json();
        console.error(`Failed to update Todo: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage);
      }
    } catch (error) {
      console.error(`Error updating Todo: `, error);
      setErrorMessage("Error updating Todo");
    }
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current month and day is before the birth month and day
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Helper function format distance for display
  const formatDistance = (distance) => {
    const switchUnit = 1000;
    let displayDistance = null;
    if (distance < 1000) {
      displayDistance = distance + " m";
      return displayDistance;
    } else {
      let roundedDistance = (distance / 1000).toFixed(2);
      displayDistance = roundedDistance + " km";
      return displayDistance;
    }
  };

  // get border-color by status
  const getBorderColorByStatus = (todoStatus) => {
    if (todoStatus === "Offen") {
      return "border-red";
    } else if (todoStatus === "In Arbeit") {
      return "border-yellow";
    } else if (todoStatus === "Erledigt") {
      return "border-green";
    } else if (todoStatus === "Abgelaufen") {
      return "border-gray";
    } else return "border-white";
  };

  // Determine tooltip text based on status
  const getTooltipText = (todoStatus) => {
    switch (todoStatus) {
      case "Offen":
        return "Rot = OFFEN";
      case "In Arbeit":
        return "Gelb = IN ARBEIT";
      case "Erledigt":
        return "Grün = ERLEDIGT";
      case "Abgelaufen":
        return "Grau = ABGELAUFEN";
      default:
        return "Unknown status.";
    }
  };

  // Handle mouse enter with delay
  const handleMouseEnter = (text) => {
    tooltipTimer = setTimeout(() => {
      setTooltipText(text);
      setTooltipVisible(true);
    }, 250); // 1000 milliseconds = 1 second
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    clearTimeout(tooltipTimer); // Clear the timer if user leaves before the delay
    setTooltipVisible(false);
  };

  return (
    <>
      <li
        key={todo.todoId}
        className={`todo-item 
        ${expandedTodo === todo.todoId ? "expanded" : "collapsed"}
        ${getBorderColorByStatus(todo.status)}
      `}
      >
        <div
          className="tooltip-area-top"
          onMouseEnter={() => handleMouseEnter(getTooltipText(todo.status))}
          onMouseLeave={handleMouseLeave}
        ></div>
        {tooltipVisible && (
          <div className="tooltip">{getTooltipText(todo.status)}</div>
        )}

        <div className="todo-summary" onClick={() => handleToggle(todo.todoId)}>
          <p className="todo-id">
            Todo Nr: {todo.todoId},
            <span className="todo-username">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </p>
          <h3>{todo.title}</h3>
          <div className="todo-user-arrow">
            {activeTab !== "myTodos" && (
              <p className="todo-username">
                by User:{" "}
                <span className="todo-username">
                  {todo.userOffered.username}
                </span>
              </p>
            )}
            <span className="arrow">
              {expandedTodo === todo.todoId ? "▲" : "▼"}
            </span>
          </div>
        </div>
        <div
          className="tooltip-area-bottom"
          onMouseEnter={() => handleMouseEnter(getTooltipText(todo.status))}
          onMouseLeave={handleMouseLeave}
        ></div>
        {expandedTodo === todo.todoId && (
          <div className="todo-details">
            <div
              className="expanded-wrapper"
              onClick={() => handleToggle(todo.todoId)}
            >
              <div className="expanded-left-container">
                <p className="location">
                  <span className="label">Abholort:</span>
                  <br />
                  {isEditing ? (
                    <input
                      className="input-field"
                      type="text"
                      value={editValues.location}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          location: e.target.value,
                        })
                      }
                      style={{ color: "#023E8A" }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="value">{todo.location}</span>
                  )}
                </p>
                <p className="description">
                  <span className="label">Beschreibung:</span>
                  <br />
                  {isEditing ? (
                    <input
                      className="input-field"
                      type="text"
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          description: e.target.value,
                        })
                      }
                      style={{
                        color: "#023E8A",
                        width: "100%",
                        minHeight: "4rem",
                        resize: "vertical",
                        padding: "0.5rem",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="value">{todo.description}</span>
                  )}
                </p>
                <p className="addInfo">
                  <span className="label">Zusatzinformation:</span>
                  <br />
                  {isEditing ? (
                    <input
                      className="input-field"
                      type="text"
                      value={editValues.addInfo}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          addInfo: e.target.value,
                        })
                      }
                      style={{
                        color: "#023E8A",
                        width: "100%",
                        minHeight: "2rem",
                        resize: "vertical",
                        padding: "0.5rem",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="value">{todo.addInfo}</span>
                  )}
                </p>
                <p className="expiresAt">
                  <span className="label">Verfallsdatum:</span>
                  <br />
                  {isEditing ? (
                    <input
                      className="input-field"
                      type="datetime-local"
                      value={
                        editValues.expiresAt
                          ? editValues.expiresAt.slice(0, 17)
                          : ""
                      }
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          expiresAt: e.target.value,
                        })
                      }
                      style={{ color: "#023E8A" }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="value">
                      {new Date(todo.expiresAt).toLocaleString()}
                    </span>
                  )}
                </p>
                <p className="status">
                  <span className="label">Status:</span>
                  <br />
                  <span className="value">{todo.status}</span>
                </p>
              </div>
              {(activeTab === "openTodos" || activeTab === "acceptedTodos") && (
                <div className="expanded-right-container">
                  <div className="userdetails">USER-DETAILS</div>
                  <span className="label">erstellt am </span>
                  <span className="value">
                    {new Date(todo.createdAt).toLocaleString()}
                  </span>
                  <br />
                  <span className="label">Name: </span>
                  <span className="value">
                    {todo.userOffered.firstName} {todo.userOffered.lastName}
                  </span>
                  <br />
                  <span className="label">Plz, Ort: </span>
                  <span className="value">
                    {todo.userOffered.address.postalCode}
                    {", "}
                    {todo.userOffered.address.city}
                  </span>
                  <br />
                  <span className="label">Strasse, Nr: </span>
                  <span className="value">
                    {todo.userOffered.address.streetNumber}
                  </span>
                  <br />
                  <span className="label">mail: </span>
                  <span className="value">{todo.userOffered.email}</span>
                  <br />
                  <span className="label">tel: </span>
                  <span className="value">{todo.userOffered.phone}</span>
                  <br />
                  <span className="label">Alter: </span>
                  <span className="value">
                    {calculateAge(todo.userOffered.dateOfBirth)},
                  </span>

                  <span className="label"> BringITS: </span>
                  <span className="value">{todo.userOffered.bringIts}</span>
                  <br />
                  <span className="label"> Entfernung zu home: </span>
                  <span className="value">{formatDistance(todo.distance)}</span>
                </div>
              )}

              {activeTab === "myTodos" &&
                (todo.status === "In Arbeit" || todo.status === "Erledigt") && (
                  <div className="expanded-right-container">
                    <div className="userdetails"> USER-DETAILS </div>

                    <span className="label">angenommen von </span>
                    <span className="value">{todo.userTaken.username}</span>
                    <br />
                    <span className="label">Name: </span>
                    <span className="value">
                      {todo.userTaken.firstName} {todo.userTaken.lastName}
                    </span>
                    <br />
                    <span className="label">Plz, Ort: </span>
                    <span className="value">
                      {todo.userTaken.address.postalCode}
                      {", "}
                      {todo.userTaken.address.city}
                    </span>
                    <br />
                    <span className="label">Strasse, Nr: </span>
                    <span className="value">
                      {todo.userTaken.address.streetNumber}
                    </span>
                    <br />
                    <span className="label">mail: </span>
                    <span className="value">{todo.userTaken.email}</span>
                    <br />
                    <span className="label">tel: </span>
                    <span className="value">{todo.userTaken.phone}</span>
                    <br />
                    <span className="label">Alter: </span>
                    <span className="value">
                      {calculateAge(todo.userTaken.dateOfBirth)}
                    </span>
                    <br />
                    <span className="label"> BringITS: </span>
                    <span className="value">{todo.userTaken.bringIts}</span>
                  </div>
                )}
            </div>
            {activeTab === "acceptedTodos" && todo.status === "In Arbeit" && (
              <div className="todo-actions">
                <TodoTemplateButton
                  handleStatusChange={handleStatusChange}
                  buttonText={"Erledigt"}
                  makeStatus={"Erledigt"}
                  todoId={todo.todoId}
                />
                <TodoTemplateButton
                  handleStatusChange={handleStatusChange}
                  buttonText={"Stornieren"}
                  makeStatus={"Offen"}
                  todoId={todo.todoId}
                />
              </div>
            )}
            {activeTab === "openTodos" && (
              <div className="todo-actions">
                <TodoTemplateButton
                  handleStatusChange={handleStatusChange}
                  buttonText={"Annehmen"}
                  makeStatus={"In Arbeit"}
                  todoId={todo.todoId}
                />
              </div>
            )}
            {activeTab === "myTodos" && (
              <div className="todo-actions">
                {todo.status !== "In Arbeit" && (
                  <>
                    {isEditing ? (
                      <>
                        <button onClick={handleSave} className="action-btn">
                          Speichern
                        </button>
                        <button
                          onClick={handleCancelEditing}
                          className="action-btn"
                        >
                          Abbrechen
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleEdit} className="action-btn">
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleCancelEditing(todo.todoId)}
                          className="action-btn"
                        >
                          Löschen
                        </button>
                      </>
                    )}
                  </>
                )}
                {todo.status === "In Arbeit" && (
                  <button
                    onClick={() => handleMyTodoCompleted(todo)}
                    className="action-btn"
                  >
                    Erledigt
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </li>
    </>
  );
};

export default TodoListTemplate;
