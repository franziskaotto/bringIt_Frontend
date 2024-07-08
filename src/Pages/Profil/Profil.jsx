import React, { useEffect, useState } from "react";
import "./Profil.css";

const Profil = () => {
  const [user, setUser] = useState(null); // Initialize with null
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState(""); // State to manage new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State to manage confirm password

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch user data
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
        setUser(data.user); // Update the user state
      } else {
        console.error("Failed to fetch User");
        setErrorMessage("Failed to fetch User " + userId);
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
      setErrorMessage("Error fetching User");
    }
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      if (name.includes("address.")) {
        const addressField = name.split(".")[1];
        updatedUser.address[addressField] = value;
      } else {
        updatedUser[name] = value;
      }
      return updatedUser;
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  // Handle form submission for updating user data
const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    setErrorMessage("Passwörter stimmen nicht überein.");
    return;
  }
  try {
    const updatedUser = { ...user };
    if (password) {
      updatedUser.password = password;
    }
    const response = await fetch(
      `http://localhost:8081/api/user`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser), // Send the entire user object
      }
    );
    if (response.ok) {
      console.log("User data updated successfully");
      setErrorMessage(""); // Reset error message state
      setEditMode(false); // Exit edit mode after successful update
      fetchUser(); // Fetch user data again to update the view
    } else {
      const errorData = await response.json();
      console.error("Failed to update user data:", errorData.errorMessage);
      setErrorMessage("Failed to update user data");
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    setErrorMessage("Error updating user data");
  }
};


  return (
    <div className="profile-container">
      {user ? (
        <div className="user-details">
          <h1>{user.username}'s Profil</h1>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <label>
                Vorname:
                <br />
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Nachname:
                <br />
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Geburtsdatum:
                <br />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <br />
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Telefon:
                <br />
                <input
                  type="tel"
                  name="phone"
                  value={user.phone || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Strasse Hausnummer:
                <br />
                <input
                  type="text"
                  name="address.streetNumber"
                  value={user.address?.streetNumber || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Stadt:
                <br />
                <input
                  type="text"
                  name="address.city"
                  value={user.address?.city || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Postleitzahl:
                <br />
                <input
                  type="text"
                  name="address.postalCode"
                  value={user.address?.postalCode || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Neues Passwort:
                <br />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <label>
                Passwort bestätigen:
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                />
              </label>
              <div>
                <button type="submit" className="save-changes-btn">Speichern</button>
                <button type="button" onClick={() => setEditMode(false)} className="cancel-btn">
                  Abbrechen
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Vorname:</strong> {user.firstName}
              </p>
              <p>
                <strong>Nachname:</strong> {user.lastName}
              </p>
              <p>
                <strong>Geburtsdatum:</strong> {user.dateOfBirth}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Telefon:</strong> {user.phone}
              </p>
              <p>
                <strong>Adresse:</strong> {user.address?.streetNumber}, {user.address?.postalCode}, {user.address?.city}
              </p>
              <h3>
                Bring-Its: <strong>{user.bringIts}</strong>
              </h3>
              <button onClick={() => setEditMode(true)} className="edit-profile-btn">
                Bearbeiten
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Userdaten werden geladen...</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Profil;
