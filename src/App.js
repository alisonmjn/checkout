import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter
import ProductPage from './components/ProductPage';
import CheckoutSummary from './components/CheckoutSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductPage />} />
        <Route path="/checkout-summary" element={<CheckoutSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
