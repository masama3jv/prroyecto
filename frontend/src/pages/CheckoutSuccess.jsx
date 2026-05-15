import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, removeFromCart } from "../services/cartService";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí podríem netejar la cistella localment per seguretat.
    const clearCartItems = async () => {
      try {
        const cart = await getCart();
        if (cart && cart.products) {
          for (let item of cart.products) {
            await removeFromCart(item.productId._id || item.productId);
          }
        }
      } catch (err) {
        console.error("Error netejant carret", err);
      }
    };
    clearCartItems();
  }, []);

  return (
    <div className="container py-5 text-center animate-fade-in" style={{ marginTop: "10vh" }}>
      <div className="display-1 mb-4">🎉</div>
      <h1 className="fw-extrabold mb-3 text-success">Pagament Completat!</h1>
      <p className="text-muted lead mb-5">
        Moltes gràcies per la teva compra. Hem rebut la teva comanda i l'estem processant.
      </p>
      
      <div className="d-flex justify-content-center gap-3">
        <Link to="/" className="premium-btn px-4 py-2 text-decoration-none">
          Tornar a l'Inici
        </Link>
      </div>
    </div>
  );
}
