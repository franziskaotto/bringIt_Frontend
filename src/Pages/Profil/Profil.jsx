import React, { useEffect, useState } from "react";
import "./Profil.css";

const Profil = () => {
  const [user, setUser] = useState(null); // Initialize with null
  const [errorMessage, setErrorMessage] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // fetch user:
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
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

  // fetch User on component mount:
  useEffect(() => {
    fetchUser();
  }, []);

  // Display currentUser in Console once it is fetched:
  useEffect(() => {
    if (user) {
      console.log(
        "CurrentUser",
        user.user.username,
        ": ",
        user,
        " / BringIts: ",
        user.user.bringIts
      );
    }
  }, [user]);

  return (
    <div className="profile-container">
      {user && user.user ? (
        <div className="user-details">
          <h1>{user.user.username}'s Profile: </h1>
          <p>
            <strong>Username:</strong> {user.user.username}
          </p>
          <p>
            <strong>Name:</strong> {user.user.firstName} {user.user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.user.phone}
          </p>
          <p>
            <strong>Adresse:</strong> {user.user.address.streetNumber},{" "}
            {user.user.address.postalCode}, {user.user.address.city}
          </p>

          <h3>
            Bring-Its: <strong>{user.user.bringIts}</strong>
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
