import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
 <Route path="/login" element={<Login onLogin={handleLogin} />} />
import Home from './pages/Home';
import Cart from './components/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminOrders from './pages/AdminOrders';
import Menu from './components/MenuItem' ;

function AppWrapper() {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

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

  const handleConfirmOrder = async () => {
    try {
      const res = await fetch('https://food-order-backend-b401.onrender.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems,
          total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
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

  const handleLoginSuccess = (receivedRole) => {
    const receivedToken = localStorage.getItem('token');
    setToken(receivedToken);
    setRole(receivedRole);
    if (receivedRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ ระบบสั่งอาหาร</h1>
      {token && <button onClick={handleLogout} style={styles.logout}>ออกจากระบบ</button>}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <>
            <Home onAdd={handleAdd} />
            <Cart
              cartItems={cartItems}
              onRemove={handleRemove}
              onConfirm={handleConfirmOrder}
            />
          </>
        } />
        <Route path="/admin" element={<AdminOrders token={token} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
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