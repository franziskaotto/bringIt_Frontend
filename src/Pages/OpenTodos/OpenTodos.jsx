import React, { useEffect, useState } from "react";
import "../../Components/Todo/Todos.css";

const OpenTodos = () => {
  const [todos, setTodos] = useState([]);
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const username = localStorage.getItem("username");
  const userId = parseInt(localStorage.getItem("userId"), 10);

  // funtion: fetch Todos by User Offered:
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8081/api/todo", {
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

  // fetch totdos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // handle expand or not
  const handleToggle = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  // update TodoStatus to 'In Arbeit':
  const handleAccept = async (todoId) => {
    const token = localStorage.getItem("token");
    const openTodoId = todoId;
    const userId = localStorage.getItem("userId");

    try {
      console.log("Sending PATCH request with: ", {
        todoId: openTodoId,
        userTakenId: userId,
        status: "In Arbeit",
      });

      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: openTodoId,
          userTakenId: userId,
          status: "In Arbeit",
        }),
      });

      if (response.ok) {
        console.log(`Todo with id ${openTodoId} has been accepted by user with id ${userId}`);
        fetchTodos();
      } else {
        const errorData = await response.json(); // Parse the error response
        console.error(`Failed to update TodoStatus: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage); // Set the error message to state
      }
    } catch (error) {
      console.error(`Error updating TodoStatus to 'In Arbeit' for todo ${openTodoId} and userTaken ${userId}: `, error);
      setErrorMessage(`${errorData.message}`);
    }
  };

  // populate:
  return (
    <div className="my-todos">
      {/* Button to reload todos */}
      {/* <ReloadTodos fetchTodos={fetchTodos} /> */}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {todos.length === 0 ? (
        <p>Es gibt derzeit keine offenen Todos</p>
      ) : (
        <ul>
          {todos
            .filter((todo) => todo.userOffered.userId !== userId) // Filter todos based on userId
            .map((todo) => (
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
                      <button onClick={() => handleAccept(todo.todoId)} className="action-btn">
                        Annehmen
                      </button>
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

export default OpenTodos;
