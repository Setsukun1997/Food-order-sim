import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('https://food-order-backend-b401.onrender.com/api/auth/login', {
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
    } catch (err) {
      console.error('Login error:', err);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className="login-container">
      <h2>เข้าสู่ระบบ</h2>
      <input
        type="email"
        placeholder="อีเมล"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      <p>
        ยังไม่มีบัญชีใช่ไหม? <Link to="/signup">สมัครสมาชิก</Link>
      </p>
    </div>
  );
}
