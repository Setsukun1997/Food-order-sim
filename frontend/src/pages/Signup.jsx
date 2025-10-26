import React, { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://food-order-sim-backend.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'user' })
      });
      if (!res.ok) throw new Error('สมัครไม่สำเร็จ');
      alert('✅ สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
    } catch (err) {
      alert('❌ สมัครไม่สำเร็จ');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>📝 สมัครสมาชิก</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ชื่อผู้ใช้" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="รหัสผ่าน" required />
      <button type="submit">สมัครสมาชิก</button>
    </form>
  );
}
