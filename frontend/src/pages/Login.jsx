import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="card glass-card p-5 shadow-lg w-100" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-5">
            <h2 className="display-6 mb-2">Benvingut</h2>
            <p className="text-muted">Accedeix a la teva experiència premium</p>
        </div>
        
        {error && <div className="alert alert-danger glass-effect mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold mb-2">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="correu@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="form-label fw-semibold mb-2">Contrasenya</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="premium-btn w-100 py-3 mb-4" disabled={loading}>
            {loading ? "Entrant..." : "Iniciar Sessió"}
          </button>
          
          <p className="text-center mb-0 text-muted">
            No tens compte? <Link to="/register" className="text-primary fw-bold text-decoration-none">Registra't ara</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;