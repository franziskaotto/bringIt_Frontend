import React, { useEffect, useState } from "react";
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

  // fetch todos on component mount = not necessary
  // because fetch is activated with useEffect on eventKey-change
  // useEffect(() => {
  //   fetchOpenTodos();
  // }, []);

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
          {todos
            .filter((todo) => todo.userOffered.userId !== userId) // Filter todos based on userId
            .map((todo) => (
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

OpenTodos.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setExpandedTodo: PropTypes.func.isRequired,
  expandedTodo: PropTypes.object,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMyTodos: PropTypes.func.isRequired,
  fetchOpenTodos: PropTypes.func.isRequired,
  fetchAcceptedTodos: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
};

export default OpenTodos;
