import React, { useEffect, useState } from "react";
import "./Profil.css";

const Profil = () => {
  const [user, setUser] = useState(null); // Initialize with null
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [errorMessage, setErrorMessage] = useState("");
  
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
        setUser(data);
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
    setUser((prevUser) => ({
      ...prevUser,
      user: {
        ...prevUser.user,
        address: {
          ...prevUser.user.address,
          [name]: value,
        },
      },
    }));
  };
  

  // Handle form submission for updating user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/api/user`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.user), // Send the entire user object
        }
      );
      if (response.ok) {
        console.log("User data updated successfully");
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
      {user && user.user ? (
        <div className="user-details">
          <h1>{user.user.username}'s Profile</h1>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={user.user.username}
                  disabled // Disable editing username
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={user.user.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={user.user.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Street Number:
                <input
                  type="text"
                  name="streetNumber"
                  value={user.user.address.streetNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={user.user.address.city}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={user.user.address.postalCode}
                  onChange={handleInputChange}
                />
              </label>
              <div>
                <button type="submit" className="save-changes-btn">Save</button>
                <button type="button" onClick={() => setEditMode(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>Username:</strong> {user.user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.user.phone}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {user.user.address.streetNumber}, {user.user.address.postalCode},{" "}
                {user.user.address.city}
              </p>
              <h3>
                Bring-Its: <strong>{user.user.bringIts}</strong>
              </h3>
              <button onClick={() => setEditMode(true)} className="edit-profile-btn">
                Edit Profil
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Profil;
