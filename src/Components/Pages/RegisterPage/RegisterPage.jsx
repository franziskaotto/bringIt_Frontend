import React, { useState } from "react";
import { Link} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import get from "lodash.get"; // for accessing the nested fields using get
import "./RegisterPage.css";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  // Define the validations for address
  address: Yup.object({
    streetNumber: Yup.string().required("Street number is required."),
    postalCode: Yup.string()
      .length(4, "Postal Code must be exactly 4 characters long.")
      .required("Postal Code is required."),
    city: Yup.string().required("City is required."),
  }),
  // Define the validations for user
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
  firstName: Yup.string()
    .matches(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes.")
    .required("First name is required."),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes.")
    .required("Last name is required."),
  dateOfBirth: Yup.date() // must be a valid date
    .required("Date of Birth is required.") 
    // .test is a custom validation, taking 3 parameters
    // a unique name "age", an error message, a valdation function
    .test("age", "You must be at least 12 years old", function (value) {  // value current value of date field
      return value && new Date().getFullYear() - value.getFullYear() >= 12; // calc difference current year /birth year
    }),
  email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
  phone: Yup.string().required("Phone number is required."),
});

// Function to handle POST to register new user
const postNewUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8081/api/user/signup", {
      method:'POST',
      headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
               
    })
     if (response.ok) {

       console.log("User registered successfully");
     } else {
       console.error("Failed to register user");
       console.log("Response status:", response.status);

       console.log("userdata:", userData)
       console.log("userData: " + JSON.stringify(userData));
     }

  } catch (error) {
    console.error("error: ", error)
  }
}

const RegisterCard = () => {
 
  // Use formik hook to manage form state, validation and submission
  const formik = useFormik({
    initialValues:{
      address: {
        streetNumber:"",
        postalCode:"",
        city:"",
      },
      username:"",
      password:"",
      firstName:"",
      lastName:"",
      dateOfBirth:"",
      email:"",
      phone:""
    },
    // Apply validation schema defined above
    validationSchema: validationSchema,
    // Function to handle form submission
    onSubmit: async (values) => {
      await postNewUser(values); // Call function to POST data to the server
    },
  });
  
 
  return (
    <div className="register-card">
      {/* Form component with onSubmit handler */}
      <form className="singIn-Form" onSubmit={formik.handleSubmit}>
        <div className="input-Container">
          {/* Map over form fields and render inputs */}
          {[
            { name: "username", type: "text", placeholder: "Benutzername", icon: "Draw.png" },
            { name: "password", type: "password", placeholder: "Passwort", icon: "password.png" },
            { name: "email", type: "text", placeholder: "Email", icon: "email.png" },
            { name: "firstName", type: "text", placeholder: "Vorname", icon: "user.png" },
            { name: "lastName", type: "text", placeholder: "Nachname", icon: "user.png" },
            { name: "dateOfBirth", type: "date", placeholder: "Geburtstag", icon: "calender.png" },
            { name: "phone", type: "text", placeholder: "Telefonnummer", icon: "phone.png" },
            { name: "address.streetNumber", type: "text", placeholder: "Straße & Nr.", icon: "PLZ.png" },
            { name: "address.postalCode", type: "text", placeholder: "Postleitzahl", icon: "PLZ.png" },
            { name: "address.city", type: "text", placeholder: "Ort", icon: "city.png" },
          ].map(({ name, type, placeholder, icon }) => { // mapping over array of form fields to render inputs dynamically
            const fieldName = name;
            const fieldError = get(formik.errors, fieldName); // accessing nested values using lodash.get
            const fieldTouched = get(formik.touched, fieldName); // accessing nested values using lodash.get

            return (
              <div key={name} className="input-with-icon">
                <img className="icon" src={`../../../../public/Images/${icon}`} alt={`${name} icon`} />
                {/* Input field with attributes */}
                <input
                  className="input-Field"
                  name={name} // Use the nested path directly in name attribute
                  type={type}
                  placeholder={placeholder}
                  value={get(formik.values, name)} // Access nested values correctly using get for nested fields
                  onChange={formik.handleChange} // Updates formik.values with the current input value as the user types
                  onBlur={formik.handleBlur} // Marks the field as touched when the user moves away after interacting
                />
                {/* Display validation error message if field is touched and has error */}
                {fieldTouched && fieldError ? (
                  <div className="error">{fieldError}</div>
                ) : null}
              </div>
            );
          })}
           <div className="button-container">
            <button className="register-button" type="submit">
              REGISTRIEREN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;