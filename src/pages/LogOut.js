import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("user");

   
    navigate("/");
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
