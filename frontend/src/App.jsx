import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import AdminOrders from './pages/AdminOrders';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminOrders" element={<AdminOrders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} /> 
      </Routes>
    </Router>
  );
}

export default App;
