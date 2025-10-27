import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';

export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://food-order-backend-8adl.onrender.com/api/menu')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('โหลดเมนูไม่สำเร็จ:', err));
  }, []);

  const handleAdd = (item) => {
    console.log('เพิ่มลงตะกร้า:', item);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map(item => (
        <MenuItem key={item._id} item={item} onAdd={handleAdd} />
      ))}
    </div>
  );
}
