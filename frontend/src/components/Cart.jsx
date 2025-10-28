import React from 'react';

function Cart({ cart, setCart }) {
  const handleConfirmOrder = async () => {
    const orderData = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
      const res = await fetch("https://food-order-backend-b401.onrender.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        alert("ส่งคำสั่งซื้อสำเร็จแล้ว!");
        setCart([]); // เคลียร์ตะกร้า
      } else {
        alert("ขอโทษค่ะ backend ไม่ทำงานค่ะ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เชื่อมต่อ backend ไม่สำเร็จ");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    setCart(updatedCart);
  };

  return (
    <div>
      <h2>ตะกร้าของคุณ</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name} - {item.price} บาท</p>
          <button onClick={() => handleQuantityChange(index, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(index, 1)}>+</button>
          <button onClick={() => handleRemoveItem(index)}>ลบ</button>
        </div>
      ))}
      <button onClick={handleConfirmOrder}>ยืนยันคำสั่งซื้อ</button>
      <button onClick={() => window.location.href = "/"}>กลับไปเลือกอาหารต่อ</button>
    </div>
  );
}

export default Cart;
