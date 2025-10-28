import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/MockData';
import { handleAddToCart } from '../utils/cartUtils';
import '../../styles/Menu.css';

export default function Menu() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    alert('ออกจากระบบแล้ว');
    navigate('/login');
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2 className="menu-title">เมนูอาหาร</h2>
        <button className="logout-button" onClick={handleLogout}>ออกจากระบบ</button>
      </div>

      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p>{item.price} บาท</p>
              <button className="menu-button" onClick={() => handleAddToCart(item)}>
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
