import React, { useEffect, useState } from "react";
import "./MyTodos.css";

const MyTodos = () => {
  const [todos, setTodos] = useState([]);
  const [expandedTodo, setExpandedTodo] = useState(null);
  const username = localStorage.getItem("username"); // Retrieve the username from localStorage


  useEffect(() => {
    const fetchTodos = async () => {
      const id = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:8081/api/todo/offeredByUser/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
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

    fetchTodos();
  }, []);

  const handleToggle = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  return (
    <div className="my-todos">
      <h2>Meine Todos</h2>
      {username && <h3>Willkommen, {username}!</h3>} {/* Display the username */}
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.todoId} className={`todo-item ${expandedTodo === todo.todoId ? 'expanded' : 'collapsed'}`}>
              <div className="todo-summary" onClick={() => handleToggle(todo.todoId)}>
                <p className="todo-id">Todo Nr: {todo.todoId}</p>
                <h3>{todo.title}</h3>
                <span className="arrow">{expandedTodo === todo.todoId ? '▲' : '▼'}</span>
              </div>
              {expandedTodo === todo.todoId && (
                <div className="todo-details">
                  <p className="location">{todo.location}</p>
                  <p className="description">{todo.description}</p>
                  <p className="addInfo">{todo.addInfo}</p>
                  <p className="uploadPath">{todo.uploadPath}</p>
                  <p className="expiresAt">{new Date(todo.expiresAt).toLocaleString()}</p>
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
