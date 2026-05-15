import { useState, useEffect } from 'react';
import { getOrders } from '../services/orderService';
import { getCurrentUser } from '../services/authService';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-6 fw-bold">El meu panell</h2>
          <p className="text-muted">Benvingut de nou, {user?.name}</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card glass-card p-4 shadow-sm border-0 h-100">
            <h4 className="fw-bold mb-3">El meu perfil</h4>
            <div className="mb-2">
              <strong>Nom:</strong> {user?.name}
            </div>
            <div className="mb-2">
              <strong>Correu:</strong> {user?.email}
            </div>
            <div className="mb-2">
              <strong>Rol:</strong> <span className="badge bg-primary text-capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card glass-card p-4 shadow-sm border-0 h-100">
            <h4 className="fw-bold mb-3">Historial de compres</h4>
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregant...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger glass-effect">{error}</div>
            ) : orders.length === 0 ? (
              <div className="text-muted text-center py-4">No has realitzat cap compra encara.</div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>ID Comanda</th>
                      <th>Data</th>
                      <th>Estat</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td><small className="text-muted">{order._id}</small></td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${order.status === 'pending' ? 'bg-warning text-dark' : order.status === 'completed' ? 'bg-success' : 'bg-secondary'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="fw-bold">{order.total.toFixed(2)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
