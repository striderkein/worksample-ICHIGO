import './styles/style.css';
import { Routes, Route, Link } from 'react-router-dom';
import UserHome from './components/UserHome';
import CustomerInfo from './components/CustomerInfo';
import OrderInfo from './components/OrderInfo';

export default function App() {
  return (
    <div className="App">
      {/* <Link to="/">HOME</Link> */}
      {/* <br /> */}
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/customer-info/:customerId" element={<CustomerInfo />} />
        <Route path="/orders" element={<OrderInfo />} />
      </Routes>
    </div>
  );
}
