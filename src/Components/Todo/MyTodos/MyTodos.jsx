import React, { useEffect, useState } from "react";
import "./MyTodos.css";
import ReloadTodos from "../ReloadTodos/ReloadTodos";

const MyTodos = ({ activeTab }) => {
  const [todos, setTodos] = useState([]);
  const [expandedTodo, setExpandedTodo] = useState(null);
  const username = localStorage.getItem("username"); // Retrieve the username from localStorage

  // Function to fetch todos
  const fetchTodos = async () => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8081/api/todo/offeredByUser/${id}`, {
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
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Fetch todos on component mount

  const handleToggle = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  const handleEdit = (todoId) => {
    // Update /PUT logic to come here
    console.log(`Editing todo with id: ${todoId}`);
    // add navigation to an edit page or open a modal for editing
  };

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
        fetchTodos();
      } else {
        console.error(`Failed to delete todo with id ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting todo with id ${id}:`, error);
    }
  };

  return (
    <div className="my-todos">
      <h2>Meine Todos</h2>
      {username && <h3>Willkommen, {username}!</h3>} {/* Display the username */}
      {/* Button to reload todos */}
      <ReloadTodos fetchTodos={fetchTodos} />
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.todoId} className={`todo-item ${expandedTodo === todo.todoId ? "expanded" : "collapsed"}`}>
              <div className="todo-summary" onClick={() => handleToggle(todo.todoId)}>
                <p className="todo-id">Todo Nr: {todo.todoId}</p>
                <h3>{todo.title}</h3>
                <span className="arrow">{expandedTodo === todo.todoId ? "▲" : "▼"}</span>
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
                    <button onClick={() => handleEdit(todo.todoId)} className="action-btn">
                      Bearbeiten
                    </button>
                    <button onClick={() => handleCancel(todo.todoId)} className="action-btn">
                      Stornieren
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

export default MyTodos;
