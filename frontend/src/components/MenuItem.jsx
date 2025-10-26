import React from 'react';

export default function MenuItem({ item, onAdd }) {
  return (
    <div className="menu-item" style={styles.container}>
      <img
        src={item.image}
        alt={item.name}
        style={styles.image}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
        }}
      />
      <h3 style={styles.name}>{item.name}</h3>
      <p style={styles.price}>ราคา: ฿{item.price}</p>
      <button style={styles.button} onClick={() => onAdd(item)}>
        ➕ เพิ่มลงตะกร้า
      </button>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '12px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '8px',
  },
  name: {
    fontSize: '18px',
    margin: '8px 0',
  },
  price: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '12px',
  },
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};