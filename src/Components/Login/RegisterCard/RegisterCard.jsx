import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterCard.css"
//Info r = register

const RegisterCard = () => {
  const [rUserName, setRUserName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rStreet, setRStreet] = useState("");
  const [rPLZ, setRPLZ] = useState("");
  const [rCity, setRCity] = useState("");
  const [rPassword, setRPassword] = useState("");

  const handleRegister = () => {};

  return (
    <div className="card">
      <form className="singIn-Form" onSubmit={handleRegister}>
        <div className="input-Container">
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/user.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              value={rUserName}
              placeholder="Username"
              onChange={(e) => setRUserName(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/email.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              value={rEmail}
              placeholder="Email-Adress"
              onChange={(e) => setREmail(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/Street.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              value={rStreet}
              placeholder="Street"
              onChange={(e) => setRStreet(e.target.value)}
            />
          </div>
          {/* __________________________________________________________________ */}
          <div className="input-with-icon">
            <img
              className="icon"
              src="../../../../public/Images/PLZ.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              value={rPLZ}
              placeholder="PLZ"
              onChange={(e) => setRPLZ(e.target.value)}
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
              value={rCity}
              placeholder="City"
              onChange={(e) => setRCity(e.target.value)}
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
              type="text"
              value={rPassword}
              placeholder="Password"
              onChange={(e) => setRPassword(e.target.value)}
              style={{ color: "red" }}
            />
          </div>
          <button className="register-button" type="submit">
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
