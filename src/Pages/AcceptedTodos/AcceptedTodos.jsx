import React, { useEffect, useState } from "react";
import "../../Components/Todo/Todos.css";

const AcceptedTodos = () => {
  const [todos, setTodos] = useState([]);
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const username = localStorage.getItem("username");

  // function: fetch Todos by User Taken:
  const fetchTodos = async () => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8081/api/todo/takenByUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error("Failed to fetch todos");
        console.log(response);
        console.log(username);
      }
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  // fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // handle expand or not
  const handleToggle = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  // Update TodoStatus:
  const handleStatusChange = async (todoId, statusChange) => {
    const token = localStorage.getItem("token");
    const acceptedTodoId = todoId;
    const userId = parseInt(localStorage.getItem("userId"), 10);

    try {
      console.log("Sending PATCH request with: ", {
        todoId: acceptedTodoId,
        userTakenId: userId,
        status: statusChange,
      });

      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: acceptedTodoId,
          userTakenId: userId,
          status: statusChange,
        }),
      });

      if (response.ok) {
        console.log(`Status of Todo ${acceptedTodoId} by userTaken ${userId} has been set to ${statusChange}`);
        fetchTodos();
      } else {
        const errorData = await response.json(); // Parse the error respons from Responsebody
        console.error(`Failed to update TodoStatus: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage); // Set the errorMessage to state
      }
    } catch (error) {
      console.error(`Error updating TodoStatus to ${statusChange} for todo ${acceptedTodoId} and userTaken ${userId}: `, error);
      setErrorMessage(`${errorData.errorMessage}`);
    }
  };

  // populate:
  return (
    <div className="my-todos">
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {todos.length === 0 ? (
        <p>Sie haben derzeit keine angenommenen Todos</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.todoId} className={`todo-item ${expandedTodo === todo.todoId ? "expanded" : "collapsed"}`}>
              <div className="todo-summary" onClick={() => handleToggle(todo.todoId)}>
                <p className="todo-id">Todo Nr: {todo.todoId}</p>
                <h3>{todo.title}</h3>
                <div className="todo-user-arrow">
                  <p className="todo-username">User: {todo.userOffered.username}</p>
                  <span className="arrow">{expandedTodo === todo.todoId ? "▲" : "▼"}</span>
                </div>
              </div>
              {expandedTodo === todo.todoId && (
                <div className="todo-details">
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
                  <p className="uploadPath">
                    <span className="label">Upload:</span>
                    <br />
                    <span className="value">{todo.uploadPath}</span>
                  </p>
                  <p className="expiresAt">
                    <span className="label">Verfallsdatum:</span>
                    <br />
                    <span className="value">{new Date(todo.expiresAt).toLocaleString()}</span>
                  </p>
                  <p className="status">
                    <span className="label">Status:</span>
                    <br />
                    <span className="value">{todo.status}</span>
                  </p>

                  <div className="todo-actions">
                    {/* {todo.userOffered.userId !== userId && ( // Conditional rendering */}
                    <button onClick={() => handleStatusChange(todo.todoId, "Erledigt")} className="action-btn">
                      Erledigt
                    </button>
                    <button onClick={() => handleStatusChange(todo.todoId, "Offen")} className="action-btn">
                      Stornieren
                    </button>

                    {/* )} */}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcceptedTodos;
