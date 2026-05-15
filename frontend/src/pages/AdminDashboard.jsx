import { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import { getAllOrders } from '../services/orderService';
import { getCurrentUser } from '../services/authService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, ordersData] = await Promise.all([
          getUsers(),
          getAllOrders()
        ]);
        setUsers(usersData);
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-end">
          <div>
            <h2 className="display-6 fw-bold text-primary">Panell Administrador</h2>
            <p className="text-muted mb-0">Gestió global del sistema</p>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger glass-effect mb-4">{error}</div>}

      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill ${activeTab === 'overview' ? 'active premium-btn border-0' : 'text-dark border'}`}
            onClick={() => setActiveTab('overview')}
          >
            Resum
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill ${activeTab === 'users' ? 'active premium-btn border-0' : 'text-dark border'}`}
            onClick={() => setActiveTab('users')}
          >
            Usuaris
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill ${activeTab === 'orders' ? 'active premium-btn border-0' : 'text-dark border'}`}
            onClick={() => setActiveTab('orders')}
          >
            Comandes
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregant...</span>
          </div>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card glass-card p-4 shadow-sm border-0 h-100 text-center">
                  <h6 className="text-muted text-uppercase mb-2">Total Usuaris</h6>
                  <h2 className="display-5 fw-bold text-primary mb-0">{users.length}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card glass-card p-4 shadow-sm border-0 h-100 text-center">
                  <h6 className="text-muted text-uppercase mb-2">Total Comandes</h6>
                  <h2 className="display-5 fw-bold text-success mb-0">{orders.length}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card glass-card p-4 shadow-sm border-0 h-100 text-center">
                  <h6 className="text-muted text-uppercase mb-2">Ingressos Totals</h6>
                  <h2 className="display-5 fw-bold text-dark mb-0">{totalRevenue.toFixed(2)}€</h2>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="card glass-card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Gestió d'Usuaris</h5>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Nom</th>
                        <th>Correu</th>
                        <th>Rol</th>
                        <th>Data Registre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id}>
                          <td className="fw-medium">{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="card glass-card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Totes les Comandes</h5>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID Comanda</th>
                        <th>Usuari</th>
                        <th>Data</th>
                        <th>Estat</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td><small className="text-muted">{order._id}</small></td>
                          <td>{order.userId?.email || 'N/A'}</td>
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
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
