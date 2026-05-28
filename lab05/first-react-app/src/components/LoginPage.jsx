import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { doLogin } from '../api/auth.js';

function LoginPage({ doLogin: onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const user = await doLogin(username, password);
      onLogin(user);
    } catch {
      setErrorMsg('Email o password non validi. Riprova.');
      setTimeout(() => setErrorMsg(''), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🎬</div>
        <h2 className="login-title">Film Library</h2>
        <p className="login-subtitle">Accedi per gestire la tua collezione</p>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="es. matteo@test.it"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="email"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
            style={{ padding: '0.65rem', fontSize: '0.95rem', fontWeight: 600 }}
          >
            {loading ? 'Accesso in corso…' : 'Accedi'}
          </Button>
        </Form>

        <div className="login-hint">
          <strong style={{ color: 'var(--text-muted)' }}>Account di test</strong><br />
          📧 <code>matteo@test.it</code> &nbsp;/&nbsp; 🔑 <code>password</code><br />
          📧 <code>luca@test.it</code> &nbsp;/&nbsp; 🔑 <code>password</code>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
