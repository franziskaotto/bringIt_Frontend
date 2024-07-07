import React, { useEffect, useState } from "react";
import "./MyTodos.css";
import ReloadTodos from "../ReloadTodos/ReloadTodos";
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
  const username = localStorage.getItem("username"); // Retrieve the username from localStorage

  return (
    <div className="my-todos">
      {/* <h2>Meine Todos</h2> 
      {/* {username && <h3>Willkommen, {username}!</h3>} */}
      {/* Display the username */}
      {/* Button to reload todos */}
      {/* <ReloadTodos fetchTodos={fetchMyTodos} /> */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
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
