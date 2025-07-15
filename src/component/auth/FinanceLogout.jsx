import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import FinanceLoginStatusContext from "../contexts/FinanceLoginStatusContext";

function FinanceLogout() {
  const [_, setLoginStatus] = useContext(FinanceLoginStatusContext);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("loginStatus");
    setLoginStatus(null);
    alert("You have been logged out.");
    navigate("/");
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default FinanceLogout;
