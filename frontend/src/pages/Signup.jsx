import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css';
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch('https://food-order-backend-8adl.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.message === 'User registered') {
      navigate('/login');
    } else {
      alert('สมัครสมาชิกไม่สำเร็จ');
    }
  };

  return (
    <div>
      <h2>สมัครสมาชิก</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>สมัครสมาชิก</button>
    </div>
  );
}
