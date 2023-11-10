import './styles/style.css';
import { Routes, Route, Link } from 'react-router-dom';
import SomeForm from './components/SomeForm';
import ErrorPage from './components/ErrorPage';
import SuccessPage from './components/SuccessPage';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SomeForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
