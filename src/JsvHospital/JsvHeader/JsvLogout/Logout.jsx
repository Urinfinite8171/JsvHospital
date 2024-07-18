import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = ({ setLogged }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setLogged(false);
    Cookies.remove("session");
    navigate("/login");
  }, [navigate, setLogged]);

  return <div>Logging out...</div>;
};

export default Logout;
