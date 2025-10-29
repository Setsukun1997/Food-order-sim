import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://food-order-backend-b401.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        alert('เข้าสู่ระบบสำเร็จ');
        navigate('/');
      } else if (data.error) {
        alert(`เข้าสู่ระบบไม่สำเร็จ: ${data.error}`);
      } else {
        alert('เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
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
        disabled={loading}
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>
      <p>
        ยังไม่มีบัญชีใช่ไหม? <Link to="/signup">สมัครสมาชิก</Link>
      </p>
      <p> เนื่องจากอันนี้คือระบบจำลองการสังอาหารดังนั้นจึงสามารสมัครโดยใช้อีเมล์ที่ไม่มีอยู่จริงได้ เพื่อการทดสอบครับ </p>
    </div>
  );
}
