import React from 'react';

function Cart({ cart, setCart }) {
  const calculateTotal = () => {
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
        setCart([]);
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
    <div style={{ padding: "20px" }}>
      <h2>🛒 ตะกร้าของคุณ</h2>
      {cart.length === 0 ? (
        <p>ยังไม่มีรายการอาหารในตะกร้า</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <p>{item.name} - {item.price} บาท</p>
            <button onClick={() => handleQuantityChange(index, -1)}>-</button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(index, 1)}>+</button>
            <button onClick={() => handleRemoveItem(index)} style={{ marginLeft: "10px", color: "red" }}>ลบ</button>
          </div>
        ))
      )}
      <h3>รวมทั้งหมด: {calculateTotal()} บาท</h3>
      <button onClick={handleConfirmOrder} style={{ marginRight: "10px" }}>✅ ยืนยันคำสั่งซื้อ</button>
      <button onClick={() => window.location.href = "/"}>🍽️ กลับไปเลือกอาหารต่อ</button>
    </div>
  );
}

export default Cart;
