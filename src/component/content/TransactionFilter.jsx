import React from "react";
import { Form } from "react-bootstrap";

export default function TransactionFilter({ selectedMonth, onMonthChange }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Filter by Month</Form.Label>
            <Form.Control
                type="month"
                value={selectedMonth}
                onChange={e => onMonthChange(e.target.value)}
            />
        </Form.Group>
    );
}
