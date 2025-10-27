export default function MenuItem({ item }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <img src={`/images/${item.image}`} alt={item.name} width="100" />
      <h3>{item.name}</h3>
      <p>{item.price} บาท</p>
      <button>เพิ่มลงตะกร้า</button>
    </div>
  );
}
