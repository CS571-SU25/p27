import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import AccountCard from "./AccountCard";
import AddAccountModal from "./AddAccountModal";
import FinanceLoginStatusContext from "../contexts/FinanceLoginStatusContext";

export default function AccountManager() {
    const [accounts, setAccounts] = useState(() => {
        const stored = localStorage.getItem("accounts");
        return stored ? JSON.parse(stored) : [];
    });

    const [showModal, setShowModal] = useState(false);
    const [cardType, setCardType] = useState("debit");

    const [loginStatus] = useContext(FinanceLoginStatusContext);
    const navigate = useNavigate();

    // 🔐 如果未登录，跳转至 login 页面
    useEffect(() => {
        if (!loginStatus) {
            navigate("/login");
        }
    }, [loginStatus, navigate]);

    useEffect(() => {
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }, [accounts]);

    function toggleDetail(id) {
        setAccounts(prev =>
            prev.map(acc => acc.id === id ? { ...acc, expanded: !acc.expanded } : acc)
        );
    }

    function handleDelete(id) {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
    }

    function handleAddAccount(newAccount) {
        setAccounts(prev => [...prev, newAccount]);
        setShowModal(false);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Account Manager</h1>
                <div>
                    <Button
                        variant="success"
                        className="me-2"
                        onClick={() => {
                            setCardType("debit");
                            setShowModal(true);
                        }}
                    >
                        + Add Debit Card
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => {
                            setCardType("credit");
                            setShowModal(true);
                        }}
                    >
                        + Add Credit Card
                    </Button>
                </div>
            </div>

            <Row>
                <Col md={9}>
                    <Row>
                        {accounts.map(acc => (
                            <Col key={acc.id} md={6} lg={4} className="mb-3">
                                <AccountCard
                                    account={acc}
                                    onToggle={toggleDetail}
                                    onDelete={handleDelete}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <AddAccountModal
                show={showModal}
                onHide={() => setShowModal(false)}
                cardType={cardType}
                onAdd={handleAddAccount}
                existingIds={accounts.map(acc => acc.id)}
            />
        </>
    );
}