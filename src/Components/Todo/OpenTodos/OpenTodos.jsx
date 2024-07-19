import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "../Todos.css";
import TodoListTemplate from "../TodoListTemplate";

const OpenTodos = ({
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
  const userId = parseInt(localStorage.getItem("userId"), 10);
  // 10 ensures that the string is interpreted as a decimal number.

  // Declare the useRef
  const firstTodoRef = useRef(null);

  // fetch todos on component mount = not necessary
  // because fetch is activated with useEffect on eventKey-change
  // useEffect(() => {
  //   fetchOpenTodos();
  // }, []);

  // scroll to first Item in the List
  useEffect(() => {
    if (todos.length > 0) {
      firstTodoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [todos]);

  return (
    <div className="my-todos">
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {todos.length === 0 ? (
        <p>Es gibt derzeit keine offenen Todos</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
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
              ref={index === 0 ? firstTodoRef : null}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpenTodos;
