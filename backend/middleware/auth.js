import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'ไม่ได้รับ token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'token ไม่ถูกต้อง' });
  }
}

export function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'ไม่ได้รับ token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'ไม่มีสิทธิ์เข้าถึงข้อมูลนี้' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'token ไม่ถูกต้อง' });
  }
}