import React from "react";
import { Card, Button } from "react-bootstrap";

export default function AccountCard({ account, onToggle, onDelete }) {

    
  return (
    <Card>
      <Card.Body>
        <Card.Title>{account.nickname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{account.bank}</Card.Subtitle>
        <p>Expire Date: {account.expire}</p>

        {account.expanded && (
          <>
            <hr />
            <p><b>Card Number:</b> {account.cardNumber}</p>
            <p><b>Card Holder:</b> {account.holder}</p>
            <p><b>Currency:</b> {account.currency}</p>
          </>
        )}

        <div className="d-flex justify-content-between mt-3">
          <Button size="sm" variant="info" onClick={() => onToggle(account.id)}>
            {account.expanded ? "Hide" : "Detail"}
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(account.id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}