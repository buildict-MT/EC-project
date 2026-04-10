import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Login from './pages/Login';
import Account from './pages/Account';
import Admin from './pages/Admin';
import OrderDetail from './pages/OrderDetail';
import Support from './pages/Support';
import About from './pages/About';
import Careers from './pages/Careers';
import EnvironmentalPolicy from './pages/EnvironmentalPolicy';
import SelectionGuide from './pages/SelectionGuide';
import CADData from './pages/CADData';
import DeliveryTime from './pages/DeliveryTime';
import Contact from './pages/Contact';
import JobApplication from './pages/JobApplication';
import CasualInterview from './pages/CasualInterview';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
    <h2>404 - ページが見つかりません</h2>
    <p>お探しのページは存在しないか、移動した可能性があります。</p>
    <a href="/" className="btn btn-primary" style={{ marginTop: '20px' }}>トップページへ戻る</a>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/support" element={<Support />} />
                <Route path="/selection-guide" element={<SelectionGuide />} />
                <Route path="/cad-data" element={<CADData />} />
                <Route path="/delivery-time" element={<DeliveryTime />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/apply" element={<JobApplication />} />
                <Route path="/careers/casual" element={<CasualInterview />} />
                <Route path="/privacy" element={<EnvironmentalPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
