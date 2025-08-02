import React, { useRef, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';
import FinanceLoginStatusContext from "../contexts/FinanceLoginStatusContext";
import "./FinanceLogin.css";

export default function FinanceLogin() {
    const usernameRef = useRef();
    const pinRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(FinanceLoginStatusContext);

    function handleLogin(e) {
        e.preventDefault();

        const username = usernameRef.current.value.trim();
        const pin = pinRef.current.value;

        if (!username || !pin) {
            alert("Please enter both account and password!");
            return;
        }

        if (pin.length < 9) {
            alert("Password must be longer than 9 characters!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "{}");

        if (!users[username]) {
            alert("This username is not registered!");
            return;
        }

        if (users[username].password !== pin) {
            alert("Incorrect password!");
            return;
        }

        const userInfo = { username };
        sessionStorage.setItem("loginStatus", JSON.stringify(userInfo));
        setLoginStatus(userInfo);

        alert("Login successful!");
        navigate("/");
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <Form onSubmit={handleLogin} className="login-form">
                <Form.Group>
                    <Form.Label>Account</Form.Label>
                    <Form.Control type="text" ref={usernameRef} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={pinRef} />
                </Form.Group>
                <br />
                <Button type="submit" className="w-100">Login</Button>
                <div className="mt-3 text-center">
                    Don't have an account yet?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        style={{ color: "#0d6efd", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Sign up now!
                    </span>
                </div>
            </Form>
        </div>
    );
}