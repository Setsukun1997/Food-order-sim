import React, { useState } from 'react';
import Home from './pages/Home';
import Cart from './components/Cart';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // เพิ่มเมนูลงตะกร้า
  const handleAdd = (item) => {
    const existingIndex = cartItems.findIndex(i => i._id === item._id);
    if (existingIndex !== -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // ลบเมนูออกจากตะกร้า
  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  // ยืนยันคำสั่งซื้อ
  const handleConfirmOrder = (items, total) => {
    fetch('https://food-order-sim-backend.onrender.com/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        total,
        timestamp: new Date().toISOString()
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Order failed');
        return res.json();
      })
      .then(data => {
        alert('✅ สั่งอาหารสำเร็จ!');
        setCartItems([]);
      })
      .catch(err => {
        alert('❌ เกิดข้อผิดพลาดในการสั่งอาหาร');
        console.error(err);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ ระบบสั่งอาหาร</h1>
      <Home onAdd={handleAdd} />
      <Cart
        cartItems={cartItems}
        onRemove={handleRemove}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '28px',
    color: '#333',
  },
};