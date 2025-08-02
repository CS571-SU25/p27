import React, { useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function TransactionForm({ accounts, currencies, onAdd }) {
    const dateRef = useRef();
    const methodRef = useRef();
    const currencyRef = useRef();
    const amountRef = useRef();
    const descRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const date = dateRef.current.value;
        const method = methodRef.current.value;
        const currency = currencyRef.current.value;
        const amount = amountRef.current.value;
        const description = descRef.current.value;

        if (!date || !method || !currency || !amount || !description) {
            alert("Please fill in all fields!");
            return;
        }

        const newTx = {
            id: Date.now(),
            date,
            method,
            currency,
            amount,
            description
        };

        onAdd(newTx);

        dateRef.current.value = "";
        methodRef.current.value = "";
        currencyRef.current.value = "";
        amountRef.current.value = "";
        descRef.current.value = "";
    }

    return (
        <Form className="mb-4" onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={2}><Form.Control type="date" ref={dateRef} /></Col>
                <Col md={2}>
                    <Form.Select ref={methodRef}>
                        <option value="">Select Method</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.nickname || acc.cardNumber}>
                                {acc.nickname || acc.cardNumber}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select ref={currencyRef}>
                        <option value="">Select Currency</option>
                        {currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}><Form.Control type="number" placeholder="Amount" ref={amountRef} /></Col>
                <Col md={3}><Form.Control type="text" placeholder="Description" ref={descRef} /></Col>
                <Col md={1}><Button type="submit">Add</Button></Col>
            </Row>
        </Form>
    );
}
