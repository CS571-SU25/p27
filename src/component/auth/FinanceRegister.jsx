import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';
import "./FinanceLogin.css";

export default function FinanceRegister() {
    const usernameRef = useRef();
    const pinRef = useRef();
    const confirmPinRef = useRef();
    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();

        const username = usernameRef.current.value.trim();
        const pin = pinRef.current.value;
        const confirmPin = confirmPinRef.current.value;

        if (!username || !pin) {
            alert("Please enter both account and password!");
            return;
        }

        if (pin.length < 9) {
            alert("Password must be longer than 9 characters!");
            return;
        }

        if (pin !== confirmPin) {
            alert("Your passwords do not match!");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
        if (existingUsers[username]) {
            alert("This username is already registered!");
            return;
        }

        existingUsers[username] = { password: pin };
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Registration successful! Please login.");
        navigate("/login");
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Register</h1>
            <Form onSubmit={handleRegister} className="login-form">
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
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPinRef} />
                </Form.Group>
                <br />
                <Button type="submit" className="w-100">Register</Button>
                <div className="mt-3 text-center">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        style={{ color: "#0d6efd", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Log in!
                    </span>
                </div>
            </Form>
        </div>
    );
}