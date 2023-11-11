import './styles/style.css';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerInfo from './components/CustomerInfo';
import OrderInfo from './components/OrderInfo';

export default function App() {
  return (
    <div className="App">
      {/* <Link to="/">HOME</Link> */}
      {/* <br /> */}
      <Link to="customer-info">customer info</Link>
      <br />
      <Link to="orders">orders</Link>
      <Routes>
        <Route path="/customer-info" element={<CustomerInfo />} />
        <Route path="/orders" element={<OrderInfo />} />
      </Routes>
    </div>
  );
}
