import React from "react";
import { Card, Button } from "react-bootstrap";

export default function TransactionCard({ transaction, onDelete }) {
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <span>{transaction.description || "(No description)"}</span>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(transaction.id)}>
            Delete
          </Button>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {formattedDate} | {transaction.currency} {parseFloat(transaction.amount).toFixed(2)}
        </Card.Subtitle>
        <Card.Text>
          <b>Payment Method:</b> {transaction.method}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
