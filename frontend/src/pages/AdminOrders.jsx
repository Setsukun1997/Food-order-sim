import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://food-order-backend-b401.onrender.com/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="admin-orders">
      <h2>รายการออเดอร์ทั้งหมด</h2>
      {orders.map((order, i) => (
        <div key={i} className="order-card">
          <p>เวลา: {new Date(order.createdAt).toLocaleString()}</p>
          {order.items.map(item => (
            <div key={item.id}>
              {item.name} x {item.quantity} ({item.price} บาท)
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
