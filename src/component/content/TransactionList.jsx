import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import FinanceLoginStatusContext from "../contexts/FinanceLoginStatusContext";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";
import TransactionFilter from "./TransactionFilter";
import { convertCurrency } from "./CurrencyConverter";

export default function TransactionList() {
    const [transactions, setTransactions] = useState(() => {
        const stored = localStorage.getItem("transactions");
        return stored ? JSON.parse(stored) : [];
    });

    const [accounts, setAccounts] = useState(() => {
        const stored = localStorage.getItem("accounts");
        return stored ? JSON.parse(stored) : [];
    });

    const [selectedMonth, setSelectedMonth] = useState("");

    const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "CAD", "AUD", "CHF", "HKD", "SEK"];

    const [loginStatus] = useContext(FinanceLoginStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            navigate("/login");
        }
    }, [loginStatus, navigate]);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    function handleAdd(transaction) {
        setTransactions(prev => [transaction, ...prev]);

        const { method, amount, currency } = transaction;

        setAccounts(prevAccounts => {
            const updated = prevAccounts.map(acc => {
                const isTarget = (acc.nickname || acc.cardNumber) === method;
                if (!isTarget) return acc;

                const targetCurrency = acc.currency;
                let adjustedAmount = parseFloat(amount);

                if (currency !== targetCurrency) {
                    const converted = convertCurrency(amount, currency, targetCurrency);
                    if (converted === null) {
                        alert(`Conversion failed from ${currency} to ${targetCurrency}`);
                        return acc;
                    }
                    adjustedAmount = converted;
                }

                if (acc.type === "debit") {
                    const newAmount = parseFloat(acc.amount || 0) - adjustedAmount;
                    return { ...acc, amount: newAmount.toFixed(2) };
                } else if (acc.type === "credit") {
                    const used = parseFloat(acc.usedCredit || 0) + adjustedAmount;
                    return { ...acc, usedCredit: used.toFixed(2) };
                }

                return acc;
            });

            localStorage.setItem("accounts", JSON.stringify(updated));
            return updated;
        });
    }

    function handleDelete(id) {
        const txToDelete = transactions.find(tx => tx.id === id);
        if (!txToDelete) return;

        setTransactions(prev => prev.filter(tx => tx.id !== id));

        const { method, amount, currency } = txToDelete;

        setAccounts(prevAccounts => {
            const updated = prevAccounts.map(acc => {
                const isTarget = (acc.nickname || acc.cardNumber) === method;
                if (!isTarget) return acc;

                const targetCurrency = acc.currency;
                let adjustedAmount = parseFloat(amount);

                if (currency !== targetCurrency) {
                    const converted = convertCurrency(amount, currency, targetCurrency);
                    if (converted === null) return acc;
                    adjustedAmount = converted;
                }

                if (acc.type === "debit") {
                    const restored = parseFloat(acc.amount || 0) + adjustedAmount;
                    return { ...acc, amount: restored.toFixed(2) };
                } else if (acc.type === "credit") {
                    const restored = parseFloat(acc.usedCredit || 0) - adjustedAmount;
                    return { ...acc, usedCredit: Math.max(0, restored).toFixed(2) };
                }

                return acc;
            });

            localStorage.setItem("accounts", JSON.stringify(updated));
            return updated;
        });
    }

    const filteredTransactions = selectedMonth
        ? transactions.filter(tx => tx.date.startsWith(selectedMonth))
        : transactions;

    return (
        <div>
            <h1>Transaction List</h1>
            <TransactionForm
                accounts={accounts}
                currencies={currencies}
                onAdd={handleAdd}
            />
            <TransactionFilter
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
            />
            <Row>
                {filteredTransactions.map(tx => (
                    <Col key={tx.id} md={6} lg={4} className="mb-3">
                        <TransactionCard
                            transaction={tx}
                            onDelete={handleDelete}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}