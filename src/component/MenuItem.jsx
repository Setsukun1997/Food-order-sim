import React from 'react';

export default function MenuItem({ item, onAdd }) {
  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} width="150" />
      <h3>{item.name}</h3>
      <p>{item.price} บาท</p>
      <button onClick={() => onAdd(item)}>เพิ่มลงตะกร้า</button>
    </div>
  );
}
