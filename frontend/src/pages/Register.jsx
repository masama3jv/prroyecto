import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Les contrasenyes no coincideixen");
    }
    setLoading(true);
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="card glass-card p-5 shadow-lg w-100" style={{ maxWidth: "550px" }}>
        <div className="text-center mb-5">
            <h2 className="display-6 mb-2">Unir-se</h2>
            <p className="text-muted">Crea el teu compte i comença a comprar</p>
        </div>

        {error && <div className="alert alert-danger glass-effect mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
              <div className="col-12 mb-2">
                <label className="form-label fw-semibold">Nom Complet</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="El teu nom"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-2">
                <label className="form-label fw-semibold">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="correu@exemple.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <label className="form-label fw-semibold">Contrasenya</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Mínim 6 caràcters"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">Confirmar</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeteix la pass"
                  onChange={handleChange}
                  required
                />
              </div>
          </div>

          <button type="submit" className="premium-btn w-100 py-3 mb-4" disabled={loading}>
            {loading ? "Creant compte..." : "Crear Compte"}
          </button>

          <p className="text-center mb-0 text-muted">
            Ja tens compte? <Link to="/login" className="text-primary fw-bold text-decoration-none">Inicia sessió</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;