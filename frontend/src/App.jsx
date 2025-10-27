import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminOrders from './pages/AdminOrders';
import Home from './pages/Home';
import Menu from './components/MenuItems';
import Cart from './components/Cart';

function App() {
  const handleLogin = (role) => {
    console.log("User role:", role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminOrders" element={<AdminOrders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;