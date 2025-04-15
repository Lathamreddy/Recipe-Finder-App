import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data
    localStorage.removeItem("user");

    // Redirect to login page ("/" is login route in updated App.js)
    navigate("/");
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
