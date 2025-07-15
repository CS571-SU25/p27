import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import AccountCard from "./AccountCard";

export default function AccountManager() {
    const [accounts, setAccounts] = useState(() => {
    const stored = localStorage.getItem("accounts");
    return stored ? JSON.parse(stored) : [];
    });


    const bankRef = useRef();
    const cardNumRef = useRef();
    const holderRef = useRef();
    const currencyRef = useRef();
    const expireRef = useRef();
    const nicknameRef = useRef();
    
    useEffect(() => {
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }, [accounts]);

    function handleAdd(e) {
        e.preventDefault();

        const newAccount = {
        id: Date.now(),
        bank: bankRef.current.value,
        cardNumber: cardNumRef.current.value,
        holder: holderRef.current.value,
        currency: currencyRef.current.value,
        expire: expireRef.current.value,
        nickname: nicknameRef.current.value,
        expanded: false
        };

        setAccounts(prev => [...prev, newAccount]);

        bankRef.current.value = "";
        cardNumRef.current.value = "";
        holderRef.current.value = "";
        currencyRef.current.value = "";
        expireRef.current.value = "";
        nicknameRef.current.value = "";
    }

    function toggleDetail(id) {
        setAccounts(prev =>
        prev.map(acc => acc.id === id ? { ...acc, expanded: !acc.expanded } : acc)
        );
    }

    function handleDelete(id) {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
    }

    return (
        <>
        <h1>Account Manager</h1>
        <Row>
            <Col md={6}>
            <Form onSubmit={handleAdd}>
                <Form.Group>
                <Form.Label>Bank Name</Form.Label>
                <Form.Control type="text" ref={bankRef} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" ref={cardNumRef} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Card Holder</Form.Label>
                <Form.Control type="text" ref={holderRef} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Currency</Form.Label>
                <Form.Control type="text" ref={currencyRef} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Expire Date</Form.Label>
                <Form.Control type="text" ref={expireRef} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Card Nickname</Form.Label>
                <Form.Control type="text" ref={nicknameRef} />
                </Form.Group>
                <br />
                <Button type="submit" className="w-100">Add Account</Button>
            </Form>
            </Col>

            <Col md={3}>
            <Row>
                {
                accounts.map(acc => (
                    <Col key={acc.id} md={12} className="mb-3">
                    <AccountCard
                        account={acc}
                        onToggle={toggleDetail}
                        onDelete={handleDelete}
                    />
                    </Col>
                ))
                }
            </Row>
            </Col>
        </Row>
        </>
    );
    }