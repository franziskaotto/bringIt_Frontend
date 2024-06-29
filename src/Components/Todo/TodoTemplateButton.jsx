import React from "react";

const TodoTemplateButton = ({ handleStatusChange, buttonText, makeStatus, todoId }) => {
  return (
    <button onClick={() => handleStatusChange(todoId, makeStatus)} className="action-btn">
      {buttonText}
    </button>
  );
};

export default TodoTemplateButton;
