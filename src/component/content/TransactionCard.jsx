import React from "react";
import { Card, Button } from "react-bootstrap";

export default function TransactionCard({ transaction, onDelete }) {
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const isDeposit = transaction.type === 'deposit';
  const amountColor = isDeposit ? "text-success" : "text-danger";
  const sign = isDeposit ? "+" : "-";

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
          {formattedDate} | <span className={amountColor}>{sign} {transaction.currency} {parseFloat(transaction.amount).toFixed(2)}</span>
        </Card.Subtitle>
        <Card.Text>
          <b>Payment Method:</b> {transaction.method}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
