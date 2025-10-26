import React from 'react';

export default function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>ตะกร้า</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          {item.name} - {item.price} บาท
          <button onClick={() => onRemove(index)}>ลบ</button>
        </div>
      ))}
      <p>รวมทั้งหมด: {total} บาท</p>
    </div>
  );
}
