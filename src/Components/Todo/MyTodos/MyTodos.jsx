import React, { useEffect, useState } from "react";
// import "./MyTodos.css";
import "../Todos.css";
import TodoListTemplate from "../TodoListTemplate";

const MyTodos = ({
  activeTab,
  setExpandedTodo,
  expandedTodo,
  todos,
  fetchMyTodos,
  fetchOpenTodos,
  fetchAcceptedTodos,
  errorMessage,
  setErrorMessage,
}) => {
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const username = localStorage.getItem("username"); // Retrieve the username from localStorage

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) => todo.status === status);
      setFilteredTodos(filtered);
    }
  };

  return (
    <div className="my-todos">
      {todos.length === 0 ? (
        <p>Sie haben derzeit keine eigenen Todos</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoListTemplate
              key={todo.todoId}
              todo={todo}
              activeTab={activeTab}
              setExpandedTodo={setExpandedTodo}
              expandedTodo={expandedTodo}
              fetchMyTodos={fetchMyTodos}
              fetchOpenTodos={fetchOpenTodos}
              fetchAcceptedTodos={fetchAcceptedTodos}
              setErrorMessage={setErrorMessage}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTodos;
