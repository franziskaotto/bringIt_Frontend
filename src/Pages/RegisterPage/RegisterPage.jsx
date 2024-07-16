import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import get from "lodash.get";
import "./RegisterPage.css";

const validationSchema = Yup.object({
  address: Yup.object({
    streetNumber: Yup.string().required("Street number is required."),
    postalCode: Yup.string()
      .length(4, "Postal Code must be exactly 4 characters long.")
      .required("Postal Code is required."),
    city: Yup.string().required("City is required."),
  }),
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes."
    )
    .required("First name is required."),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes."
    )
    .required("Last name is required."),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required.")
    .test("age", "You must be at least 12 years old", function (value) {
      return value && new Date().getFullYear() - value.getFullYear() >= 12;
    }),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  phone: Yup.string().required("Phone number is required."),
});

const postNewUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8081/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 409) {
      return { success: false, message: "Username existiert bereits." };
    } else if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return {
        success: false,
        message:
          data.message ||
          "Fehler beim Registrieren des Benutzers. Bitte versuche es erneut.",
      };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message:
        "Fehler beim Registrieren des Benutzers. Bitte versuche es erneut.",
    };
  }
};

const RegisterCard = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState(""); // State to hold registration message
  const formik = useFormik({
    initialValues: {
      address: {
        streetNumber: "",
        postalCode: "",
        city: "",
      },
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { success, message } = await postNewUser(values);
      if (success) {
        setIsSubmitted(true);
      } else {
        setRegistrationMessage(message); // Set registration error message
      }
    },
  });

  const handleBackButton = () => {
    window.location.href = "http://localhost:5173/";
  };

  if (isSubmitted) {
    return (
      <div className="registration-saved">
        <p>Du hast dich erfolgreich registriert!</p>
        <div
          className="close-button"
          onClick={() => {
            setIsSubmitted(false);
            setRegistrationMessage(""); // Reset message state
            window.location.href = "http://localhost:5173/";
            formik.resetForm();
          }}
        >
          X
        </div>
      </div>
    );
  }

  return (
    <div className="register-card-wrapper">
      <div className="register-card">
        <form className="singIn-Form" onSubmit={formik.handleSubmit}>
          <div className="input-container-register">
            {[
              {
                name: "username",
                type: "text",
                placeholder: "Benutzername",
                icon: "Draw.png",
              },
              {
                name: "password",
                type: "password",
                placeholder: "Passwort",
                icon: "password.png",
              },
              {
                name: "email",
                type: "text",
                placeholder: "Email",
                icon: "email.png",
              },
              {
                name: "firstName",
                type: "text",
                placeholder: "Vorname",
                icon: "user.png",
              },
              {
                name: "lastName",
                type: "text",
                placeholder: "Nachname",
                icon: "user.png",
              },
              {
                name: "dateOfBirth",
                type: "date",
                placeholder: "Geburtstag",
                icon: "calender.png",
              },
              {
                name: "phone",
                type: "text",
                placeholder: "Telefonnummer",
                icon: "phone.png",
              },
              {
                name: "address.streetNumber",
                type: "text",
                placeholder: "Straße & Nr.",
                icon: "PLZ.png",
              },
              {
                name: "address.postalCode",
                type: "text",
                placeholder: "Postleitzahl",
                icon: "PLZ.png",
              },
              {
                name: "address.city",
                type: "text",
                placeholder: "Ort",
                icon: "city.png",
              },
            ].map(({ name, type, placeholder, icon }) => {
              const fieldName = name;
              const fieldError = get(formik.errors, fieldName);
              const fieldTouched = get(formik.touched, fieldName);

              return (
                <div key={name} className="input-with-icon">
                  <img
                    className="icon"
                    src={`../../../../public/Images/${icon}`}
                    alt={`${name} icon`}
                  />
                  <input
                    className="input-Field"
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={get(formik.values, name)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {fieldTouched && fieldError ? (
                    <div className="error">{fieldError}</div>
                  ) : null}
                </div>
              );
            })}
            {registrationMessage && (
              <div className="error">{registrationMessage}</div>
            )}
            <>
              <button className="register-button" onClick={handleBackButton}>
                ZURÜCK
              </button>
              <button className="register-button" type="submit">
                REGISTRIEREN
              </button>
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
