import React, { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://food-order-sim-backend.onrender.com/api/order')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h2>คำสั่งซื้อทั้งหมด</h2>
      {orders.map(order => (
        <div key={order._id}>
          <p>🧾 Order #{order._id}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
          <p>รวม: ฿{order.total}</p>
          <p>เวลา: {new Date(order.timestamp).toLocaleString('th-TH')}</p>
        </div>
      ))}
    </div>
  );
}
