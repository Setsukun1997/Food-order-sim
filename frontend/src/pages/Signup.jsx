import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSignup = async () => {
  try {
   const res = await fetch('https://food-order-backend-b401.onrender.com/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);

    if (data.message === 'User registered') {
      alert('สมัครสมาชิกสำเร็จ');
      navigate('/login');
    } else {
      alert(data.error || 'สมัครสมาชิกไม่สำเร็จ');
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert('เกิดข้อผิดพลาด');
  }
};

  return (
    <div className="signup-container">
      <h2>สมัครสมาชิก</h2>
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
      <button onClick={handleSignup}>ลงทะเบียน</button>
      <p>
        มีบัญชีอยู่แล้ว? <Link to="/login">กลับไปเข้าสู่ระบบ</Link>
      </p>
    </div>
  );
}
