import { useState } from "react";
import TodoTemplateButton from "./TodoTemplateButton";
import PropTypes from "prop-types";

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

  // handle expand or not
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

  // Update Todo
  const handleEdit = (todoId) => {
    // Update /PUT logic to come here
    console.log(`Editing todo with id: ${todoId}`);
    // add navigation to an edit page or open a modal for editing
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

  // get border-color by status
  const getBorderColorByStatus = (todoStatus) => {
    if (todoStatus === "Offen") {
      return "border-red";
    } else if (todoStatus === "In Arbeit") {
      return "border-yellow";
    } else if (todoStatus === "Erledigt") {
      return "border-green";
    } else if (todoStatus === "Abgelaufen") {
      return "border-blue";
    } else return "border-white";
  };

  //  ${getBorderColorByStatus(todo.status)}

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
        <div className="todo-details" onClick={() => handleToggle(todo.todoId)}>
          <p className="location">
            <span className="label">Abholort:</span>
            <br />
            <span className="value">{todo.location}</span>
          </p>
          <p className="description">
            <span className="label">Beschreibung:</span>
            <br />
            <span className="value">{todo.description}</span>
          </p>
          <p className="addInfo">
            <span className="label">Zusatzinformation:</span>
            <br />
            <span className="value">{todo.addInfo}</span>
          </p>
          {/* 
          <p className="uploadPath">
            <span className="label">Upload:</span>
            <br />
            <span className="value">{todo.uploadPath}</span>
          </p> */}

          <p className="expiresAt">
            <span className="label">Verfallsdatum:</span>
            <br />
            <span className="value">
              {new Date(todo.expiresAt).toLocaleString()}
            </span>
          </p>
          <p className="status">
            <span className="label">Status:</span>
            <br />
            <span className="value">{todo.status}</span>
          </p>
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
              <button
                onClick={() => handleEdit(todo.todoId)}
                className="action-btn"
              >
                Bearbeiten
              </button>
              <button
                onClick={() => handleCancel(todo.todoId)}
                className="action-btn"
              >
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
            </div>
          )}
        </div>
      )}
    </li>
  );
};

// TodoListTemplate.propTypes = {
//   todo: PropTypes.shape({
//     todoId: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     location: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     addInfo: PropTypes.string,
//     expiresAt: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     userOffered: PropTypes.shape({
//       username: PropTypes.string.isRequired,
//     }).isRequired,
//     userTaken: PropTypes.shape({
//       userId: PropTypes.number.isRequired,
//     }).isRequired,
//   }).isRequired,
//   activeTab: PropTypes.oneOf(["myTodos", "openTodos", "acceptedTodos"]).isRequired,
//   setExpandedTodo: PropTypes.func.isRequired,
//   expandedTodo: PropTypes.number,
//   fetchMyTodos: PropTypes.func.isRequired,
//   fetchOpenTodos: PropTypes.func.isRequired,
//   fetchAcceptedTodos: PropTypes.func.isRequired,
//   setErrorMessage: PropTypes.func.isRequired,
// };

export default TodoListTemplate;
