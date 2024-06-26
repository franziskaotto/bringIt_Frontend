import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import get from "lodash.get"; // Ensure lodash.get is imported
import "./CreateTodo.css";

// Define the validation schema using yup
const validationSchema = Yup.object({
  userOfferedId: Yup.string().required(), // Ensure userId is required in validation
  title: Yup.string()
    .required("Bitte Title eingeben.")
    .max(45, "Titel darf 45 Zeichen nicht überschreiten."),
  location: Yup.string()
    .required("Bitte einen Abholort eingeben.")
    .max(45, "Abholort darf 45 Zeichen nicht überschreiten."),
  description: Yup.string()
    .required("Bitte Beschreibung eingeben.")
    .max(220, "Beschreibung darf 220 Zeichen nicht überschreiten."),
  addInfo: Yup.string()
    .max(150, "Zusatzinformation darf 150 Zeichen nicht überschreiten."),
  uploadPath: Yup.string()
    .max(50, "Pfad darf 50 Zeichen nicht überschreiten."),
  expiresAt: Yup.date()
    .required()
    .test(
      "is-future-date",
      "Das Datum muss mindestens 2 Stunden in der Zukunft liegen.",
      (value) => {
        if (!value) return false;
        const now = new Date();
        const futureDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
        return value >= futureDate;
      }
    )
});

// Function to handle POST to register new todo
const postNewTodo = async (todoData) => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  const userOfferedId = localStorage.getItem("userId") // Retrieve username from local storage

  try {
    const response = await fetch("http://localhost:8081/api/todo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify({ ...todoData, userOfferedId }), // Include userOfferedId in the request body
    });
    if (response.ok) {
      console.log("Todo erfolgreich erstellt.");
      return true;
    } else {
      console.error("Todo konnte nicht erstellt werden.");
      console.log("Response status:", response.status);
      console.log("todoData:", todoData);
      console.log("userId:", userOfferedId);
      console.log("todoData: " + JSON.stringify(todoData));
      return false;
    }
  } catch (error) {
    console.error("error: ", error);
    return false;
  }
}

const CreateTodo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      //userId: localStorage.getItem("userId") // Initialize userId from localStorage
      userOfferedId: parseInt(localStorage.getItem("userId"), 10), // Ensure userId is a number
      title: "",
      location: "",
      description: "",
      addInfo: "",
      uploadPath: "",
      expiresAt: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //const userId = localStorage.getItem("userId"); // Retrieve userId from local storage
      const success = await postNewTodo(values);
      if (success) {
        setIsSubmitted(true);
      }
    },
  });

  if (isSubmitted) {
    return <div className="todo-saved">Todo erfolgreich erstellt!</div>;
  }

  return (
    <div className="todo-card">
      {/* Form component with onSubmit handler */}
      <form className="todo-Form" onSubmit={formik.handleSubmit}>
        <div className="input-container-todo">
          {/* Display userOfferedId as read-only text */}
          { /* <p className="user-id-text">User ID: {formik.values.userOfferedId}</p>*/}
          {[
            { name: "title", type: "text", placeholder: "Titel", icon: "Draw.png" },
            { name: "location", type: "text", placeholder: "Abholort", icon: "Draw.png" },
            { name: "description", type: "textarea", placeholder: "Beschreibung", icon: "Draw.png", rows: 6, cols: 40 },
            { name: "addInfo", type: "textarea", placeholder: "Zusatzinformationen", icon: "Draw.png", rows: 3, cols: 40 },
            { name: "uploadPath", type: "text", placeholder: "Upload", icon: "Draw.png" },
            { name: "expiresAt", type: "datetime-local", placeholder: "Verfällt am ...", icon: "Draw.png" },
          ].map(({ name, type, placeholder, icon, rows, cols }) => {
            const fieldName = name;
            const fieldError = get(formik.errors, fieldName);
            const fieldTouched = get(formik.touched, fieldName);

            return (
              <div key={name} className="input-with-icon">
                <img className="icon" src={`../../../../public/Images/${icon}`} alt={`${name} icon`} />
                {type === "textarea" ? (
                  <textarea
                    className="input-Field"
                    name={name}
                    placeholder={placeholder}
                    value={get(formik.values, name)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={rows}
                    cols={cols}
                  />
                ) : (
                  <input
                    className="input-Field"
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={get(formik.values, name)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
                {fieldTouched && fieldError ? (
                  <div className="error">{fieldError}</div>
                ) : null}
              </div>
            );
          })}
          <div className="button-container">
            <button className="saveTodo-button" type="submit">
              TODO SPEICHERN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
