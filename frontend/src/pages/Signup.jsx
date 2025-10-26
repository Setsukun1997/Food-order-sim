import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    try {
      const res = await fetch('https://food-order-sim-backend.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'user' })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'สมัครไม่สำเร็จ');
        return;
      }

      alert('✅ สมัครสมาชิกสำเร็จ!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>สมัครสมาชิก</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>สมัครสมาชิก</button>
      </form>
      {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      <p style={styles.link}>
        มีบัญชีแล้ว? <Link to="/">เข้าสู่ระบบ</Link>
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
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center'
  },
  link: {
    marginTop: '16px',
    textAlign: 'center'
  }
};