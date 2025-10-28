export const handleAddToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};
export const updateQuantity = (id, delta) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updated = cart.map(item =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
  );

  localStorage.setItem('cart', JSON.stringify(updated));
};
export const removeItem = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updated = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updated));
};
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};
