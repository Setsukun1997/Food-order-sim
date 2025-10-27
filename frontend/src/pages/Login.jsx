import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://food-order-backend-bf01.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        alert('✅️เข้าสู่ระบบสำเร็จ');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌️เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className="login">
      <h2>เข้าสู่ระบบ</h2>
      <div className="form-group">
        <label>อีเมล</label>
        <input
          type="email"
          placeholder="กรอกอีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>รหัสผ่าน</label>
        <input
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      <p>
        ยังไม่มีบัญชี? <Link to="/signup">สมัครสมาชิก</Link>
      </p>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  signupText: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#555'
  },
  signupLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};
export default Login;