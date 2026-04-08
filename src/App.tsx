import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ProductList from './pages/ProductList.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import CartPage from './pages/Cart.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { CartProvider } from './context/CartContext.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
