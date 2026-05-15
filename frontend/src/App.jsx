import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from './services/authService'
import CartSidebar from './components/CartSidebar'

function App() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleCart = (e) => {
    if (e) e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light glass-effect container sticky-top">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <div className="bg-primary rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <span className="text-white fw-bold">E</span>
            </div>
            <span className="fw-extrabold text-dark">E-SHOP</span>
          </Link>
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link px-3 fw-medium" to="/">Inici</Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link px-3 fw-medium cursor-pointer" href="#" onClick={toggleCart}>
                      Cistella
                    </a>
                  </li>
                  <li className="nav-item">
                    {user.role === 'admin' ? (
                      <Link className="nav-link px-3 fw-medium" to="/admin">Panell Admin</Link>
                    ) : (
                      <Link className="nav-link px-3 fw-medium" to="/dashboard">El meu panell</Link>
                    )}
                  </li>
                  <li className="nav-item dropdown ms-lg-3">
                    <span className="nav-link d-flex align-items-center">
                      <div className="bg-light border rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <span className="text-primary fw-bold" style={{ fontSize: '0.8rem' }}>{user.name[0].toUpperCase()}</span>
                      </div>
                      <span className="fw-semibold">{user.name}</span>
                    </span>
                  </li>
                  <li className="nav-item ms-lg-2">
                    <button className="btn btn-dark rounded-pill px-4 btn-sm" onClick={handleLogout}>Sortir</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link px-3 fw-medium" to="/login">Login</Link>
                  </li>
                  <li className="nav-item ms-lg-2">
                    <Link className="premium-btn text-decoration-none d-inline-block px-4 py-2" to="/register">Unir-se</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Outlet context={{ toggleCart }} />
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <footer className="py-5 bg-white border-top mt-5">
        <div className="container">
          <div className="row g-4 justify-content-between">
            <div className="col-md-4">
              <h5 className="mb-4">E-SHOP</h5>
              <p className="text-muted">La teva destinació premium per a la millor tecnologia i estil de vida. Productes curats amb la millor qualitat.</p>
            </div>
            <div className="col-md-auto">
              <h6 className="text-dark fw-bold mb-3">Enllaços</h6>
              <ul className="list-unstyled text-muted">
                <li className="mb-2"><Link to="/" className="text-decoration-none text-reset">Inici</Link></li>
                <li className="mb-2"><Link to="/cart" className="text-decoration-none text-reset">Cistella</Link></li>
              </ul>
            </div>
            <div className="col-md-auto">
              <h6 className="text-dark fw-bold mb-3">Soporte</h6>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">Contacte</li>
                <li className="mb-2">FAQ</li>
              </ul>
            </div>
          </div>
          <hr className="my-4 opacity-10" />
          <div className="text-center">
            <p className="mb-0 text-muted small">&copy; 2026 E-SHOP Premium. Realitzat amb passió per a tu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
