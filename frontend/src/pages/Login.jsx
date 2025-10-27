import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('login clicked');
    try {
      const res = await fetch('https://food-order-backend-8adl.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert('เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>เข้าสู่ระบบ</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      <p>ยังไม่มี
