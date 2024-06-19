import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterCard.css"




const postNewUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8081/api/user/", {
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
     }
  } catch (error) {
    console.error("error: ", error)
  }
    

}

const RegisterCard = () => {
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      address: {
        streetNumber: streetNumber,
        postalCode: postalCode,
        city: city,
      },
      username: username,
      password: password,
      fistName: fistName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      phone: phone,
    };

    postNewUser(userData)


  };



    

  

  return (
    <div className="register-card">
      <form className="singIn-Form" onSubmit={handleRegister}>
        <div className="input-Container">
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/Draw.png"
            ></img>
            <input
              className="input-Field"
              name="userName"
              type="text"
              value={username}
              placeholder="Benutzername"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icons"
              src="../../../../public/Images/email.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/user.png"
            ></img>
            <input
              className="input-Field"
              name="firstName"
              type="text"
              value={fistName}
              placeholder="Vorname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/user.png"
            ></img>
            <input
              className="input-Field"
              name="LastName"
              type="text"
              value={lastName}
              placeholder="Nachname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/calender.png"
            ></img>
            <input
              className="input-Field"
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              placeholder="Geburtstag"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/phone.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              name="phone"
              value={phone}
              placeholder="Telefonnummer"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img className="icon" src="../../../../public/Images/PLZ.png"></img>
            <input
              className="input-Field"
              type="text"
              name="streetNumber"
              value={streetNumber}
              placeholder="Straße & Nr."
              onChange={(e) => setStreetNumber(e.target.value)}
            />
          </div>
          <div className="input-with-icon">
            <img className="icon" src="../../../../public/Images/PLZ.png"></img>
            <input
              className="input-Field"
              type="text"
              name="postalCode"
              value={postalCode}
              placeholder="Postleitzahl"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/city.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              name="city"
              value={city}
              placeholder="Ort"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/password.png"
              alt="User Icon"
            />
            <input
              className="input-Field"
              type="password"
              name="password"
              value={password}
              placeholder="Passwort"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
