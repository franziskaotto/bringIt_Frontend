import React from "react";

const TodoTemplateButton = ({handleStatusChange, buttonText, status }) => {
 return (
    <button onClick={() => handleStatusChange(todo.todoId, status)} className="action-btn">
       {buttonText}
    </button>
 )
};

export default TodoTemplateButton;