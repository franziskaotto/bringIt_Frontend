import React, { useEffect, useState, useRef } from "react";
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

  // Declare the useRef
  const firstTodoRef = useRef(null);

  // fetch todos on component mount = not necessary
  // because fetch is activated with useExxect on eventKey-change
  // useEffect(() => {
  //   fetchAcceptedTodos();
  // }, []);

  // Sort todos with "In Arbeit" before "Erledigt"
  // const sortedTodos = todos.sort((a, b) => {
  //   if (a.status === "In Arbeit" && b.status !== "In Arbeit") return -1;
  //   if (a.status !== "In Arbeit" && b.status === "In Arbeit") return 1;
  //   return 0;
  // });

  const sortedTodos = todos;

  // scroll to first Item in the List
  useEffect(() => {
    if (todos.length > 0) {
      firstTodoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [todos]);

  return (
    <div className="my-todos">
      {sortedTodos.length === 0 ? (
        <p>Sie haben derzeit keine angenommenen Todos</p>
      ) : (
        <ul>
          {sortedTodos
            // .filter((todo) => todo.userOffered.userId !== userId)
            .map((todo, index) => (
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

export default AcceptedTodos;
