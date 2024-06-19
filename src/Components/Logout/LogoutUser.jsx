const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.href = "http://localhost:5173/";
  };

  export default handleLogout;
  