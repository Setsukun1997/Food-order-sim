const handleAddToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${item.name} ถูกเพิ่มลงตะกร้าแล้ว`);
};
