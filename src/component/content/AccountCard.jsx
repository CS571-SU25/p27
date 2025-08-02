import React from "react";
import { Card, Button } from "react-bootstrap";

export default function AccountCard({ account, onToggle, onDelete }) {
  const isDebit = account.type === "debit";
  const isCredit = account.type === "credit";
  const usedCredit = parseFloat(account.usedCredit || 0);
  const availableCredit = parseFloat(account.creditLimit || 0) - usedCredit;


  return (
    <Card>
      <Card.Body>
        <Card.Title>{account.nickname || "(No Nickname)"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{account.bank}</Card.Subtitle>
        <p><b>Expire Date:</b> {account.expire}</p>
        <p><b>Card Type:</b> {isDebit ? "Debit Card" : "Credit Card"}</p>

        {isDebit && (
          <p><b>Balance:</b> {account.currency} {parseFloat(account.amount || 0).toFixed(2)}</p>
        )}

        {isCredit && (
          <p><b>Available Credit:</b> {account.currency} {availableCredit.toFixed(2)}</p>
        )}


        {account.expanded && (
          <>
            <hr />
            <p><b>Card Number:</b> {account.cardNumber}</p>
            <p><b>Card Holder:</b> {account.holder}</p>
            <p><b>Currency:</b> {account.currency}</p>
            {isCredit && (
              <p><b>Total Credit Limit:</b> {account.currency} {parseFloat(account.creditLimit || 0).toFixed(2)}</p>
            )}
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