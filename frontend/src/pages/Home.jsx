import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getProducts } from "../services/productService";
import { addToCart } from "../services/cartService";

export default function Home() {
  const { toggleCart } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      toggleCart();
    } catch (err) {
      alert("Has d'iniciar sessió per afegir productes");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5 animate-fade-in">
      {/* Hero Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">Nova Col·lecció 2026</span>
          <h1 className="display-3 mb-4">Tecnologia que defineix <br/><span className="text-primary text-gradient">el teu futur.</span></h1>
          <p className="lead text-muted mb-5">Explora la nostra selecció exclusiva d'articles premium dissenyats per millorar la teva vida quotidiana.</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="mb-1">Productes Destacats</h2>
          <p className="text-muted mb-0">La millor qualitat seleccionada per a tu.</p>
        </div>
        <button className="btn btn-outline-dark btn-sm rounded-pill px-3">Veure tots</button>
      </div>

      {error && <div className="alert alert-danger glass-effect">{error}</div>}
      
      <div className="row g-4">
        {products.map((p) => (
          <div key={p._id} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card h-100 glass-card">
              <div className="overflow-hidden position-relative" style={{ borderRadius: '20px 20px 0 0' }}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} className="card-img-top" alt={p.name} style={{ height: "240px", objectFit: "cover" }} />
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "240px" }}>
                    <span className="text-muted">Sense imatge</span>
                  </div>
                )}
                <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge glass-effect text-dark rounded-pill px-3 py-2">Premium</span>
                </div>
              </div>
              <div className="card-body d-flex flex-column p-4">
                <div className="mb-2">
                    <span className="text-uppercase text-muted fw-bold small ls-1">{p.category}</span>
                </div>
                <h5 className="card-title h6 fw-bold mb-2">{p.name}</h5>
                <p className="card-text text-muted small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>
                <div className="d-flex align-items-center justify-content-between mt-auto">
                    <span className="h5 fw-bold mb-0 text-primary">{p.price}€</span>
                    <button className="premium-btn py-2 px-3 btn-sm" onClick={() => handleAddToCart(p)}>
                      + Afegir
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && !error && (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No hi ha productes disponibles en aquest moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
