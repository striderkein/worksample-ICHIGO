import './styles/style.css';
import { Routes, Route, Link } from 'react-router-dom';
import UserHome from './components/UserHome';
import TierInfo from './components/TierInfo';
import OrderInfo from './components/OrderInfo';

export default function App() {
  return (
    <div className="App">
      {/* <Link to="/">HOME</Link> */}
      {/* <br /> */}
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/customer-info/:customerId" element={<TierInfo />} />
        <Route path="/orders/:customerId" element={<OrderInfo />} />
      </Routes>
    </div>
  );
}
