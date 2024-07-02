import React, { useEffect, useState } from "react";
import "./Profil.css";

const Profil = () => {
  const [currentUser, setCurrentUser] = useState(null); // Initialize with null
  const [errorMessage, setErrorMessage] = useState("");

  console.log("inside Profil");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // fetch user:
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user data: ", data); // Log the fetched data
        setCurrentUser(data);
      } else {
        console.error("Failed to fetch User");
        console.log("response: " + response);
        setErrorMessage("Failed to fetch User " + userId);
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
      setErrorMessage("Error fetching User");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("CurrentUser: ", currentUser);
      console.log("BringITS of " + currentUser.user.username + ": " + currentUser.user.bringIts);
    }
  }, [currentUser]);

  return (
    <div className="profile-container">
      {currentUser && currentUser.user ? (
        <div className="user-details">
          <h1>{currentUser.user.username}'s Profile: </h1>
          <p>
            <strong>Username:</strong> {currentUser.user.username}
          </p>
          <p>
            <strong>Name:</strong> {currentUser.user.firstName} {currentUser.user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {currentUser.user.phone}
          </p>
          <p>
            <strong>Adresse:</strong> {currentUser.user.address.streetNumber}, {currentUser.user.address.postalCode}, {currentUser.user.address.city}
          </p>

          <h3>
            Bring-Its: <strong>{currentUser.user.bringIts}</strong>
          </h3>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Profil;
