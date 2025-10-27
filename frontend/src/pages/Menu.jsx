import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem';

export default function Menu() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('https://food-order-backend-8adl.onrender.com/api/menu')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h2>เมนูอาหาร</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
