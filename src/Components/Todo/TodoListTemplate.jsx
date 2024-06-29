// import React from "react";
// import "./Todos.css";

const TodoListTemplate = () => {
  // populate:
  return (
    <ul>
      {todos
        .filter((todo) => todo.userOffered.userId !== userId) // Filter todos based on userId
        .map((todo) => (
          <li key={todo.todoId} className={`todo-item ${expandedTodo === todo.todoId ? "expanded" : "collapsed"}`}>
            <div className="todo-summary" onClick={() => handleToggle(todo.todoId)}>
              <p className="todo-id">Todo Nr: {todo.todoId}</p>
              <h3>{todo.title}</h3>
              <div className="todo-user-arrow">
                <p className="todo-username">User: {todo.userOffered.username}</p>
                <span className="arrow">{expandedTodo === todo.todoId ? "▲" : "▼"}</span>
              </div>
            </div>
            {expandedTodo === todo.todoId && (
              <div className="todo-details">
                <p className="location">
                  <span className="label">Abholort:</span>
                  <br />
                  <span className="value">{todo.location}</span>
                </p>
                <p className="description">
                  <span className="label">Beschreibung:</span>
                  <br />
                  <span className="value">{todo.description}</span>
                </p>
                <p className="addInfo">
                  <span className="label">Zusatzinformation:</span>
                  <br />
                  <span className="value">{todo.addInfo}</span>
                </p>
                <p className="uploadPath">
                  <span className="label">Upload:</span>
                  <br />
                  <span className="value">{todo.uploadPath}</span>
                </p>
                <p className="expiresAt">
                  <span className="label">Verfallsdatum:</span>
                  <br />
                  <span className="value">{new Date(todo.expiresAt).toLocaleString()}</span>
                </p>
                <p className="status">
                  <span className="label">Status:</span>
                  <br />
                  <span className="value">{todo.status}</span>
                </p>

                <div className="todo-actions">
                  <button onClick={() => handleAccept(todo.todoId)} className="action-btn">
                    Annehmen
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default TodoListTemplate;
