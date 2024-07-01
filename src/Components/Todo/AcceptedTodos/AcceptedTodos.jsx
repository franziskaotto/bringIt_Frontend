import React, { useEffect, useState } from "react";
import "../Todos.css";
import TodoListTemplate from "../TodoListTemplate";

const AcceptedTodos = ({
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
  // because fetch is activated with useExxect on eventKey-change
  // useEffect(() => {
  //   fetchAcceptedTodos();
  // }, []);

  // Sort todos with "In Arbeit" before "Erledigt"
  const sortedTodos = todos.sort((a, b) => {
    if (a.status === "In Arbeit" && b.status !== "In Arbeit") return -1;
    if (a.status !== "In Arbeit" && b.status === "In Arbeit") return 1;
    return 0;
  });

  return (
    <div className="my-todos">
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {sortedTodos.length === 0 ? (
        <p>Sie haben derzeit keine angenommenen Todos</p>
      ) : (
        <ul>
          {sortedTodos
            .filter((todo) => todo.userOffered.userId !== userId)
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

export default AcceptedTodos;
