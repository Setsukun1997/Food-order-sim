import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateQuantity, removeItem } from '../utils/cartUtils';
import '../styles/Cart.css';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleUpdate = (id, delta) => {
    updateQuantity(id, delta);
    setCart(getCart());
  };

  const handleRemove = (id) => {
    removeItem(id);
    setCart(getCart());
  };

  const handleConfirmOrder = async () => {
    try {
      const res = await fetch('https://your-backend-url/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
      });
      if (res.ok) {
        alert('สั่งซื้อสำเร็จแล้ว!');
        localStorage.removeItem('cart');
        navigate('/menu');
      } else {
        alert('เกิดข้อผิดพลาดในการสั่งซื้อ');
      }
    } catch (err) {
      console.error(err);
      alert('เชื่อมต่อ backend ไม่สำเร็จ');
    }
  };

  return (
    <div className="cart-container">
      <h2>ตะกร้าของคุณ</h2>

      <button className="back-button" onClick={() => navigate('/menu')}>
        กลับไปสั่งอาหารต่อ
      </button>

      {cart.length === 0 ? (
        <p>ยังไม่มีรายการอาหารในตะกร้า</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.price} บาท</p>
                <div className="cart-controls">
                  <button onClick={() => handleUpdate(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.id, 1)}>+</button>
                  <button onClick={() => handleRemove(item.id)}>ลบ</button>
                </div>
              </div>
            </div>
          ))}

          <button className="confirm-button" onClick={handleConfirmOrder}>
            ยืนยันคำสั่งซื้อ
          </button>
        </>
      )}
    </div>
  );
}
