import React, { useState } from "react";
import { LockKeyhole, LogIn, RotateCcw, ShieldCheck } from "lucide-react";

export function AdminLogin({ credentials, onLogin, onResetCredentials }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === credentials.username && password === credentials.password) {
      setError("");
      onLogin();
      return;
    }
    setError("Incorrect username or password.");
  };

  const handleReset = () => {
    onResetCredentials();
    setUsername("admin");
    setPassword("admin123");
    setError("Credentials reset. Use admin / admin123 to sign in.");
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={30} />
        </div>
        <span className="section-tag">Private workspace</span>
        <h1>Admin Control Center</h1>
        <p>Sign in to manage your portfolio content.</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label className="form-label" htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            className="form-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />

          <label className="form-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="form-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <div className="admin-login-error" role="alert">{error}</div>}

          <button type="submit" className="btn-glow admin-login-submit">
            <LogIn size={16} /> Sign In
          </button>
        </form>

        <div className="admin-login-note">
          <LockKeyhole size={14} />
          <span>Credentials can be changed after signing in.</span>
        </div>
        <button type="button" className="admin-login-reset" onClick={handleReset}>
          <RotateCcw size={14} /> Reset to default login
        </button>
      </section>
    </main>
  );
}
