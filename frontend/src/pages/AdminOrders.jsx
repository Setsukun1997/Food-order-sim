import React, { useEffect, useState } from 'react';

export default function AdminOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://food-order-sim-backend.onrender.com/api/order', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('ไม่สามารถโหลดคำสั่งซื้อได้');

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>⏳ กำลังโหลดคำสั่งซื้อ...</p>;
  if (error) return <p>❌ {error}</p>;
  if (orders.length === 0) return <p>📭 ยังไม่มีคำสั่งซื้อ</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 คำสั่งซื้อทั้งหมด</h2>
      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <p><strong>🧾 Order ID:</strong> {order._id}</p>
          <p><strong>🕒 เวลา:</strong> {new Date(order.timestamp).toLocaleString('th-TH')}</p>
          <p><strong>💰 รวม:</strong> ฿{order.total}</p>
          <ul style={styles.list}>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} x {item.quantity} — ฿{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  },
  card: {
    marginBottom: '20px',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#fefefe'
  },
  list: {
    marginTop: '10px',
    paddingLeft: '20px'
  }
};