import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Cart from './components/Cart';
import Login from './pages/Login';
import AdminOrders from './pages/AdminOrders';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleAdd = (item) => {
    const index = cartItems.findIndex(i => i._id === item._id);
    if (index !== -1) {
      const updated = [...cartItems];
      updated[index].quantity = (updated[index].quantity || 1) + 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleConfirmOrder = async (items, total) => {
    try {
      const res = await fetch('https://food-order-sim-backend.onrender.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          items,
          total,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('สั่งอาหารไม่สำเร็จ');

      alert('✅ สั่งอาหารสำเร็จ!');
      setCartItems([]);
    } catch (err) {
      alert('❌ เกิดข้อผิดพลาดในการสั่งอาหาร');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  const handleLoginSuccess = (receivedToken, receivedRole) => {
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('role', receivedRole);
    setToken(receivedToken);
    setRole(receivedRole);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ ระบบสั่งอาหาร</h1>

      {!token ? (
        <Login onLogin={handleLoginSuccess} />
      ) : role === 'admin' ? (
        <>
          <button onClick={handleLogout} style={styles.logout}>ออกจากระบบ</button>
          <AdminOrders token={token} />
        </>
      ) : (
        <>
          <button onClick={handleLogout} style={styles.logout}>ออกจากระบบ</button>
          <Home onAdd={handleAdd} />
          <Cart
            cartItems={cartItems}
            onRemove={handleRemove}
            onConfirm={handleConfirmOrder}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '28px',
    color: '#333',
  },
  logout: {
    marginBottom: '16px',
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};