import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/MockData';
import { handleAddToCart } from '../utils/cartUtils';
import '../styles/Menu.css';

export default function Menu() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="menu-container">
      <h2 className="menu-title">เมนูอาหาร</h2>
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p>{item.price} บาท</p>
              <button onClick={() => {
  handleAddToCart(item);
  alert(`${item.name} ถูกเพิ่มลงตะกร้าแล้ว`);
}}>
  เพิ่มลงตะกร้า
</button>
<button className="logout-button" onClick={handleLogout}>
  ออกจากระบบ
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
