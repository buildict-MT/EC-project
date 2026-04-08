import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Link to="/" className="logo">RecruitDirect</Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">トップ</Link>
          <Link to="/products" className="nav-link">商品一覧</Link>
          <Link to="/simulator" className="nav-link">選定ツール</Link>
          <Link to="/support" className="nav-link">サポート</Link>
        </nav>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Search size={20} className="text-light" />
          
          {isAuthenticated ? (
            <Link to="/account" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
              <User size={20} className="text-light" />
              <span style={{ fontSize: '14px' }}>{user?.email.split('@')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
              <LogIn size={20} className="text-light" />
              <span style={{ fontSize: '14px' }}>ログイン</span>
            </Link>
          )}

          <Link to="/cart" style={{ position: 'relative' }}>
            <ShoppingCart size={20} className="text-light" />
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--accent-color)', color: 'white', fontSize: '10px', padding: '2px 5px', borderRadius: '50%' }}>
              {cart.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
