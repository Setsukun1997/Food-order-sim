import React from 'react';
import { menuItems } from '../data/mockData';
import MenuItem from '../components/MenuItem';

export default function Home({ onAdd }) {
  return (
    <div>
      <h2>เมนูอาหาร</h2>
      <div className="menu-list">
        {menuItems.map(item => (
          <MenuItem key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
