import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart } from "../services/cartService";

export default function CartSidebar({ isOpen, onClose }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const total = cart?.products.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0) || 0;

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'show' : ''}`}>
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white bg-opacity-50">
          <h3 className="h5 fw-bold mb-0">La teva Cistella</h3>
          <button className="btn-close shadow-none" onClick={onClose}></button>
        </div>

        <div className="flex-grow-1 overflow-auto p-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
            </div>
          ) : !cart || cart.products.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">Cistella buida</p>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={onClose}>Continuar comprant</button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {cart.products.map((item) => (
                <div key={item.productId._id} className="d-flex gap-3 animate-fade-in">
                  <div className="bg-light rounded p-1" style={{ width: '70px', height: '70px', minWidth: '70px' }}>
                    <img src={item.productId.imageUrl} alt={item.productId.name} className="img-fluid rounded" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small fw-bold mb-1">{item.productId.name}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-muted">{item.quantity} x {item.productId.price}€</span>
                      <span className="small fw-bold">{(item.productId.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  </div>
                  <button className="btn btn-link text-danger p-0 align-self-start" onClick={() => handleRemove(item.productId._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-top bg-white bg-opacity-50 mt-auto">
          <div className="d-flex justify-content-between mb-3">
            <span className="fw-medium">Total</span>
            <span className="h5 fw-extrabold mb-0 text-primary">{total.toFixed(2)}€</span>
          </div>
          <button 
            className="premium-btn w-100 py-3 mb-2" 
            disabled={!cart || cart.products.length === 0}
            onClick={() => { onClose(); navigate("/checkout"); }}
          >
            Finalitzar Compra
          </button>
        </div>
      </div>
    </>
  );
}
