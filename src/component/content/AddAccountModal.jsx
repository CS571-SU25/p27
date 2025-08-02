import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function AddAccountModal({ show, onHide, cardType, onAdd, existingIds }) {
    const bankRef = useRef();
    const cardNumRef = useRef();
    const holderRef = useRef();
    const currencyRef = useRef();
    const amountRef = useRef();
    const creditLimitRef = useRef();
    const expireRef = useRef();
    const nicknameRef = useRef();
    const allowedCurrencies = ["USD", "EUR", "GBP", "JPY", "CNY", "CAD", "AUD", "CHF", "HKD", "SEK"];

    function handleSubmit(e) {
        e.preventDefault();

        const bank = bankRef.current?.value.trim();
        const cardNumber = cardNumRef.current?.value.trim();
        const holder = holderRef.current?.value.trim();
        const currency = currencyRef.current?.value.trim();
        const amount = amountRef.current?.value.trim() || "";
        const creditLimit = creditLimitRef.current?.value.trim() || "";
        const expire = expireRef.current?.value.trim();
        const nickname = nicknameRef.current?.value.trim();

        const requiredMissing =
            !bank || !cardNumber || !holder || !currency || !expire ||
            (cardType === "debit" && !amount) ||
            (cardType === "credit" && !creditLimit);

        if (requiredMissing) {
            alert("Please fill in all required fields!");
            return;
        }

        if (existingIds.includes(cardNumber)) {
            alert("This card number already exists!");
            return;
        }

        const newAccount = {
            id: cardNumber,
            type: cardType,
            bank,
            cardNumber,
            holder,
            currency,
            amount: cardType === "debit" ? amount : null,
            creditLimit: cardType === "credit" ? creditLimit : null,
            expire,
            nickname,
            expanded: false
        };

        onAdd(newAccount);

        bankRef.current.value = "";
        cardNumRef.current.value = "";
        holderRef.current.value = "";
        currencyRef.current.value = "";
        if (amountRef.current) amountRef.current.value = "";
        if (creditLimitRef.current) creditLimitRef.current.value = "";
        expireRef.current.value = "";
        nicknameRef.current.value = "";

        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add {cardType === "debit" ? "Debit" : "Credit"} Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                        <Form.Select ref={currencyRef}>
                            <option value="">Select Currency</option>
                            {allowedCurrencies.map(cur => (
                                <option key={cur} value={cur}>{cur}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {cardType === "debit" && (
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" ref={amountRef} />
                        </Form.Group>
                    )}

                    {cardType === "credit" && (
                        <Form.Group>
                            <Form.Label>Total Credit Limit</Form.Label>
                            <Form.Control type="number" ref={creditLimitRef} />
                        </Form.Group>
                    )}

                    <Form.Group>
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control type="month" ref={expireRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Card Nickname</Form.Label>
                        <Form.Control type="text" ref={nicknameRef} />
                    </Form.Group>
                    <br />
                    <Button type="submit" className="w-100">
                        Add {cardType === "debit" ? "Debit" : "Credit"} Card
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}