import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem';

export default function Menu() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('https://food-order-backend-8adl.onrender.com/api/menu')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('โหลดเมนูไม่สำเร็จ:', err);
        setLoading(false);
      });
  }, []);

  const handleAdd = (item) => {
    console.log('เพิ่มลงตะกร้า:', item.name);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>กำลังโหลดเมนู...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>🍽️ เมนูอาหาร</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
        {items.map(item => (
          <MenuItem key={item._id} item={item} onAdd={() => handleAdd(item)} />
        ))}
      </div>
    </div>
  );
}
