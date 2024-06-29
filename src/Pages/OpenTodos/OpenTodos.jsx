import React, { useEffect, useState } from "react";
import "../../Components/Todo/Todos.css";
import TodoListTemplate from "../../Components/Todo/TodoListTemplate";

const OpenTodos = () => {
  const [todos, setTodos] = useState([]);
  
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const username = localStorage.getItem("username");
  const userId = parseInt(localStorage.getItem("userId"), 10);

  // funtion: fetch Todos by User Offered:
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
        console.log(response);
        console.log(username);
      }
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  // fetch totdos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // // handle expand or not
  // const handleToggle = (todoId) => {
  //   setExpandedTodo(expandedTodo === todoId ? null : todoId);
  // };

  // update TodoStatus to 'In Arbeit':
  const handleAccept = async (todoId) => {
    const token = localStorage.getItem("token");
    const openTodoId = todoId;
    const userId = localStorage.getItem("userId");

    try {
      console.log("Sending PATCH request with: ", {
        todoId: openTodoId,
        userTakenId: userId,
        status: "In Arbeit",
      });

      const response = await fetch(`http://localhost:8081/api/todo/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: openTodoId,
          userTakenId: userId,
          status: "In Arbeit",
        }),
      });

      if (response.ok) {
        console.log(`Todo with id ${openTodoId} has been accepted by user with id ${userId}`);
        fetchTodos();
      } else {
        const errorData = await response.json(); // Parse the error response
        console.error(`Failed to update TodoStatus: ${errorData.errorMessage}`);
        setErrorMessage(errorData.errorMessage); // Set the error message to state
      }
    } catch (error) {
      console.error(`Error updating TodoStatus to 'In Arbeit' for todo ${openTodoId} and userTaken ${userId}: `, error);
      setErrorMessage(`${errorData.message}`);
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
            .map((todo) => (<TodoListTemplate todo={todo} handleAccept={handleAccept} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default OpenTodos;
