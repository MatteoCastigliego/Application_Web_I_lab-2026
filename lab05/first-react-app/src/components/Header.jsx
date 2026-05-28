import { useContext } from 'react';
import { Button, Container, Form, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import UserContext from '../contexts/UserContext.js';
import { doLogout } from '../api/auth.js';

function Header({ doLogout: onLogout }) {
  const location = useLocation();
  const user = useContext(UserContext);

  const handleLogout = async () => {
    await doLogout();
    onLogout();
  };

  const initials = user.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm py-3 mb-4">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          🎬 Film Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" />

          <div className="d-flex align-items-center gap-3">
            <Form className="d-flex gap-2">
              <Form.Control
                type="search"
                placeholder="🔍 Cerca film..."
                aria-label="Search"
                className="rounded-pill border-0 shadow-sm"
                style={{ width: '250px', paddingLeft: '1.2rem' }}
              />
            </Form>

            {user.id ? (
              <div className="d-flex align-items-center gap-2">
                <div className="user-chip">
                  <div className="user-avatar">{initials}</div>
                  <span className="user-name">{user.name}</span>
                </div>
            <Button variant="light" size="sm" onClick={handleLogout} className="rounded-pill px-3 fw-bold text-primary shadow-sm">
                  Esci
                </Button>
              </div>
            ) : (
              location.pathname !== '/login' && (
            <Button as={Link} to="/login" variant="light" className="rounded-pill px-4 fw-bold text-primary shadow-sm">
                  Accedi
                </Button>
              )
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
