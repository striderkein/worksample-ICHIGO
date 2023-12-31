import './styles/style.css';
import { Routes, Route } from 'react-router-dom';
import UserHome from './components/UserHome';
import CustomerInfo from './components/CustomerInfo';
import OrderInfo from './components/OrderInfo';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/customer-info/:customerId" element={<CustomerInfo />} />
        <Route path="/orders/:customerId" element={<OrderInfo />} />
      </Routes>
    </div>
  );
}
