import { Link } from "react-router-dom";

export default function CheckoutCancel() {
  return (
    <div className="container py-5 text-center animate-fade-in" style={{ marginTop: "10vh" }}>
      <div className="display-1 mb-4">💳</div>
      <h1 className="fw-extrabold mb-3 text-danger">Pagament Cancel·lat</h1>
      <p className="text-muted lead mb-5">
        El procés de pagament s'ha interromput o ha fallat. Cap càrrec ha estat efectuat.
      </p>
      
      <div className="d-flex justify-content-center gap-3">
        <Link to="/checkout" className="btn btn-outline-dark px-4 py-2">
          Tornar a intentar-ho
        </Link>
        <Link to="/" className="btn btn-link px-4 py-2 text-decoration-none text-muted">
          Continuar comprant
        </Link>
      </div>
    </div>
  );
}
