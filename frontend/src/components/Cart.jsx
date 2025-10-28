import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('โหลด cart ไม่สำเร็จ:', err);
      return [];
    }
  });
  const calculateTotal = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const handleConfirmOrder = async () => {
    const orderData = {
      items: cart,
      total: calculateTotal()
    };

    try {
      const res = await fetch("https://food-order-backend-b401.onrender.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        alert("ส่งคำสั่งซื้อสำเร็จแล้ว!");
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/menu");
      } else {
        alert("ขอโทษค่ะ backend ไม่ทำงานค่ะ");
      }
    } catch (error) {
      console.error("เชื่อมต่อ backend ไม่สำเร็จ:", error);
      alert("เชื่อมต่อ backend ไม่สำเร็จ");
    }
  };
  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 ตะกร้าของคุณ</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
cart.map((item, index) => (
  <div key={index} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
    {item.image && (
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
      />
    )}
    <p>{item.name} - {item.price} บาท</p>
   <button className="cart-controls button" onClick={() => handleQuantityChange(index, -1)}>-</button>
<span style={{ margin: "0 10px" }}>{item.quantity}</span>
<button className="cart-controls button" onClick={() => handleQuantityChange(index, 1)}>+</button>
<button className="cart-controls button remove-button red" onClick={() => handleRemoveItem(index)}>ลบ</button>
  </div>
))
      ) : (
        <p>ยังไม่มีรายการอาหารในตะกร้า</p>
      )}
      <h3>รวมทั้งหมด: {calculateTotal()} บาท</h3>
     <button className="confirm-button" onClick={handleConfirmOrder}>✅ ยืนยันคำสั่งซื้อ</button>
<button className="back-button" onClick={() => navigate("/")}>🍽️ กลับไปเลือกอาหารต่อ</button>
    </div>
  );
}

export default Cart;
