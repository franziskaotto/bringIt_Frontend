import React from "react";
import "./Todos.css";

const TodoTemplateButton = ({
  handleStatusChange,
  buttonText,
  makeStatus,
  todoId,
}) => {
  return (
    <button
      onClick={() => handleStatusChange(todoId, makeStatus)}
      className="action-btn"
    >
      {buttonText}
    </button>
  );
};

export default TodoTemplateButton;
