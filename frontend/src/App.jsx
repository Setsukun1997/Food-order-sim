import React, { useState } from 'react';
import Home from './pages/Home';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAdd = item => setCartItems([...cartItems, item]);
  const handleRemove = index => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  return (
    <div>
      <h1>ระบบสั่งอาหารจำลอง 🍽️</h1>
      <Home onAdd={handleAdd} />
      <Cart cartItems={cartItems} onRemove={handleRemove} />
    </div>
  );
}

export default App;
