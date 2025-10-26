import React from 'react';

export default function Cart({ cartItems, onRemove, onConfirm }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div style={styles.container}>
      <h2>ตะกร้าของคุณ</h2>

      {cartItems.length === 0 ? (
        <p>ยังไม่มีรายการอาหารในตะกร้า</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={styles.item}>
              <span>
                {item.name} x {item.quantity || 1} — ฿{item.price * (item.quantity || 1)}
              </span>
              <button style={styles.removeBtn} onClick={() => onRemove(index)}>
                ❌ ลบ
              </button>
            </div>
          ))}

          <p style={styles.total}>รวมทั้งหมด: ฿{total}</p>

          <button style={styles.confirmBtn} onClick={() => onConfirm(cartItems, total)}>
            ✅ ยืนยันคำสั่งซื้อ
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '6px',
  },
  removeBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  total: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginTop: '16px',
  },
  confirmBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '12px',
    fontSize: '16px',
  },
};