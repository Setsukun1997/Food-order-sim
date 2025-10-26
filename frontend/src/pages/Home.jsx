import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';

export default function Home({ onAdd }) {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://food-order-sim-backend.onrender.com/api/menu')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch menu');
        return res.json();
      })
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>เมนูอาหาร</h2>

      {loading && <p>กำลังโหลดเมนู...</p>}
      {error && <p style={{ color: 'red' }}>เกิดข้อผิดพลาด: {error}</p>}

      <div className="menu">
        {menu.map(item => (
          <MenuItem key={item._id || item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}