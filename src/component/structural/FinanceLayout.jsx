import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import FinanceLoginStatusContext from "../contexts/FinanceLoginStatusContext";

export default function FinanceLayout() {
  const [loginStatus, setLoginStatus] = useState(() => {
    const saved = sessionStorage.getItem("loginStatus");
    return saved ? JSON.parse(saved) : null;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top" className="px-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            My Finance Tracker
          </Navbar.Brand>

          <Button
            variant="outline-light"
            onClick={() => setMenuOpen(true)}
            aria-controls="menu-drawer"
          >
            ☰
          </Button>
        </Container>
      </Navbar>

      <Offcanvas
        show={menuOpen}
        onHide={() => setMenuOpen(false)}
        placement="end"
        id="menu-drawer"
        style={{ backgroundColor: "#222", color: "#fff" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" style={{ gap: "0.75rem" }}>
            <Nav.Link as={Link} to="/" onClick={() => setMenuOpen(false)}>Home</Nav.Link>
            {
              loginStatus ?
              <Nav.Link as={Link} to="/logout" onClick={() => setMenuOpen(false)}>Logout</Nav.Link> :
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setMenuOpen(false)}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={() => setMenuOpen(false)}>Register</Nav.Link>
              </>
            }
            <Nav.Link as={Link} to="/accounts" onClick={() => setMenuOpen(false)}>Accounts</Nav.Link>
            <Nav.Link as={Link} to="/transactions" onClick={() => setMenuOpen(false)}>Transactions</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div style={{ margin: "1rem", paddingTop: "4.5rem" }}>
        <FinanceLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
          <Outlet />
        </FinanceLoginStatusContext.Provider>
      </div>
    </div>
  );
}