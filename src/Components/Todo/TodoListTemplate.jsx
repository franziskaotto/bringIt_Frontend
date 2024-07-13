/* eslint-disable react/prop-types */
import { useState } from "react";
import TodoTemplateButton from "./TodoTemplateButton";
//import CreateTodo from "./CreateTodo";

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
  const userId = parseInt(localStorage.getItem("userId"), 10);

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
      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId,
          userTakenId,
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
      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId,
          userTakenId,
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
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handle save edited todo
  const handleSave = async () => {
    const token = localStorage.getItem("token");
  
    // Format the date to 'YYYY-MM-DDTHH:MM:SS' before sending to the server
    const formattedDate = new Date(editValues.expiresAt).toISOString().slice(0, 16);
  
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
  
  

  // get border-color by status
  const getBorderColorByStatus = (todoStatus) => {
    switch (todoStatus) {
      case "Offen":
        return "border-red";
      case "In Arbeit":
        return "border-yellow";
      case "Erledigt":
        return "border-green";
      case "Abgelaufen":
        return "border-blue";
      default:
        return "border-white";
    }
  };

  return (
    <li
      key={todo.todoId}
      className={`todo-item 
        ${expandedTodo === todo.todoId ? "expanded" : "collapsed"}
        ${getBorderColorByStatus(todo.status)}
      `}
    >
      <div className="todo-summary" onClick={() => handleToggle(todo.todoId)}>
        <p className="todo-id">Todo Nr: {todo.todoId}</p>
        <h3>{todo.title}</h3>
        <div className="todo-user-arrow">
          <p className="todo-username">by User: {todo.userOffered.username}</p>
          <span className="arrow">
            {expandedTodo === todo.todoId ? "▲" : "▼"}
          </span>
        </div>
      </div>
      {expandedTodo === todo.todoId && (
        <div className="todo-details">
          <div>
            <p className="location">
              <span className="label">Abholort:</span>
              <br />
              {isEditing ? (
                <input
                  type="text"
                  value={editValues.location}
                  onChange={(e) => setEditValues({ ...editValues, location: e.target.value })}
                  style={{ color: "#023E8A" }}

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
                  type="text"
                  value={editValues.description}
                  onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                  style={{ color: "#023E8A", width: "100%", minHeight: "4rem", resize: "vertical", padding: "0.5rem" }}

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
                  type="text"
                  value={editValues.addInfo}
                  onChange={(e) => setEditValues({ ...editValues, addInfo: e.target.value })}
                  style={{ color: "#023E8A", width: "100%", minHeight: "2rem", resize: "vertical", padding: "0.5rem" }}

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
           type="datetime-local"
           value={editValues.expiresAt ? editValues.expiresAt.slice(0, 17) : ''}
           onChange={(e) => setEditValues({ ...editValues, expiresAt: e.target.value })}
           style={{ color: "#023E8A" }}
         />
         
              ) : (
                <span className="value">{new Date(todo.expiresAt).toLocaleString()}</span>
              )}
            </p>
            <p className="status">
              <span className="label">Status:</span>
              <br />
              <span className="value">{todo.status}</span>
            </p>
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
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="action-btn">
                    Speichern
                  </button>
                  <button onClick={handleCancel} className="action-btn">
                    Abbrechen
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit} className="action-btn">
                    Bearbeiten
                  </button>
                  <button onClick={() => handleCancel(todo.todoId)} className="action-btn">
                    Löschen
                  </button>
                  {todo.status === "In Arbeit" && (
                    <button
                      onClick={() => handleMyTodoCompleted(todo)}
                      className="action-btn"
                    >
                      Erledigt
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default TodoListTemplate;
