import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../services/cartService";
import { createOrder, createCheckoutSession } from "../services/orderService";
import { loadStripe } from "@stripe/stripe-js";

// Carrega la clau asíncronament
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_...");

export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Validem si el carret està buit abans de deixar pagar
    const verifyCart = async () => {
      try {
        const cart = await getCart();
        if (!cart || cart.products.length === 0) {
          alert("La teva cistella està buida.");
          navigate("/cart");
        }
        setCartCount(cart.products.length);
      } catch (err) {
        console.error(err);
      }
    };
    verifyCart();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartCount === 0) return;
    
    setLoading(true);
    try {
      // 1. Creem la comanda local amb les dades
      const order = await createOrder({ shippingAddress, paymentMethod: 'card' });
      
      // 2. Creem la sessió Stripe
      const sessionData = await createCheckoutSession(order._id);
      
      // 3. Redirigim cap a Stripe
      if (sessionData.url) {
        window.location.href = sessionData.url;
      } else {
        throw new Error("No s'ha obtingut l'enllaç de pagament");
      }
      
    } catch (err) {
      alert(err.message || "Hi ha hagut un error en processar la comanda");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="glass-card p-5 shadow-lg">
            <div className="text-center mb-5">
                <h2 className="display-6 mb-2">Finalitzar Compra</h2>
                <p className="text-muted">Introdueix les teves dades d'enviament per processar el pagament</p>
            </div>
            
            <form onSubmit={handleCheckout}>
              <div className="mb-5">
                <h4 className="fw-bold mb-4">Adreça d'enviament</h4>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Nom</label>
                    <input type="text" className="form-control p-3 bg-light" name="firstName" required 
                           value={shippingAddress.firstName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Cognoms</label>
                    <input type="text" className="form-control p-3 bg-light" name="lastName" required 
                           value={shippingAddress.lastName} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small">Adreça completa</label>
                    <input type="text" className="form-control p-3 bg-light" name="address" required 
                           value={shippingAddress.address} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Ciutat</label>
                    <input type="text" className="form-control p-3 bg-light" name="city" required 
                           value={shippingAddress.city} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Codi Postal</label>
                    <input type="text" className="form-control p-3 bg-light" name="zipCode" required 
                           value={shippingAddress.zipCode} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="bg-light-subtle p-4 rounded-4 mb-5 border">
                  <div className="d-flex align-items-start small text-muted">
                      <div className="me-3">🔒</div>
                      <div>En fer clic seràs redirigit a la passarel·la segura de Stripe per introduir la informació de pagament de forma encriptada.</div>
                  </div>
              </div>

              <button type="submit" className="premium-btn w-100 py-3 btn-lg shadow-lg" disabled={loading}>
                {loading ? "Redirigint a Stripe..." : "Anar a Pagar"}
              </button>
              
              <button type="button" className="btn btn-link w-100 mt-4 text-muted text-decoration-none small" onClick={() => navigate("/")}>← Tornar a la botiga</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
