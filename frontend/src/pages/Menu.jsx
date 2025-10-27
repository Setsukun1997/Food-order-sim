import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://food-order-backend-b401.onrender.com/api/menu')
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
    // คุณสามารถเพิ่ม logic ตะกร้า หรือ localStorage ได้ที่นี่
  };

  if (loading) return <p style={styles.loading}>กำลังโหลดเมนู...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🍽️ เมนูอาหาร</h2>
      <div style={styles.grid}>
        {items.map(item => (
          <MenuItem key={item._id} item={item} onAdd={() => handleAdd(item)} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center'
  },
  loading: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '18px'
  }
};
