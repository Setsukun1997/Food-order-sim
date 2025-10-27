import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ import Link ด้วย

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('https://food-order-backend-8adl.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert('เข้าสู่ระบบไม่สำเร็จ');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>เข้าสู่ระบบ</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleLogin} style={{ width: '100%' }}>เข้าสู่ระบบ</button>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        ยังไม่มีบัญชีใช่ไหม? <Link to="/signup">สมัครสมาชิก</Link>
      </p>
    </div>
  );
}
