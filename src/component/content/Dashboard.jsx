import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import FinanceLoginStatusContext from "../contexts/FinanceLoginStatusContext";
import "./Dashboard.css";

export default function Dashboard() {
  const [loginStatus] = useContext(FinanceLoginStatusContext);
  const navigate = useNavigate();

  if (!loginStatus) {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Your Personal Finance Tracker!</h1>
        <p className="dashboard-subtitle">
          This app helps you track your expenses, income, and account balances across different cards and currencies.
          Please register or log in to continue.
        </p>
        <div className="dashboard-button-group">
          <Button variant="primary" size="lg" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="success" size="lg" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Hello {loginStatus.username}! </h1>
      <p className="dashboard-subtitle">Please Select......</p>
      <div className="dashboard-buttons">
        <Button variant="primary" size="lg" className="me-3" onClick={() => navigate("/accounts")}>
          Manage Accounts
        </Button>
        <Button variant="success" size="lg" onClick={() => navigate("/transactions")}>
          Record Transactions
        </Button>
      </div>
    </div>
  );
}