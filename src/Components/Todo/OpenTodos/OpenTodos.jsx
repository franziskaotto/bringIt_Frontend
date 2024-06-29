import React, { useEffect, useState } from "react";
import "../Todos.css";
import TodoListTemplate from "../TodoListTemplate";

const OpenTodos = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const activeTab = "openTodos";
  const userId = parseInt(localStorage.getItem("userId"), 10);

  // fetch All not expired Todos with Status "Offen":
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8081/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error("Failed to fetch todos");
        console.log("response: " + response + " / userId: " + userId);
        setErrorMessage("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos: ", error);
      setErrorMessage("Error fetching todos");
    }
  };

  // fetch totdos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Update Todo Status
  const handleStatusChange = async (todoId, makeStatus) => {
    const token = localStorage.getItem("token");

    try {
      console.log("Sending PATCH request with: ", {
        todoId: todoId,
        userTakenId: userId,
        status: makeStatus,
      });

      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId,
          userTakenId: userId,
          status: makeStatus,
        }),
      });

      if (response.ok) {
        console.log(`Status of Todo ${todoId} updated to ${makeStatus}`);
        fetchTodos();
      } else {
        const errorData = await response.json();
        console.error(`Failed to update TodoStatus: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage);
      }
    } catch (error) {
      console.error(`Error updating TodoStatus: `, error);
      setErrorMessage("Error updating TodoStatus");
    }
  };

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
              <TodoListTemplate key={todo.todoId} todo={todo} activeTab={activeTab} handleStatusChange={handleStatusChange} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default OpenTodos;
