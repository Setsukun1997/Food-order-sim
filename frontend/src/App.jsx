import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminOrders from './pages/AdminOrders';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './components/Cart';

function App() {
  const handleLogin = (role) => {
    console.log("User role:", role);
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <Routes>

        <Route path="/" element={isLoggedIn() ? <Menu /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/adminOrders" element={<AdminOrders />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/home" element={<Home />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
