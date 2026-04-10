import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ marginBottom: '20px' }}>RecruitDirect</h3>
            </Link>
            <p style={{ opacity: 0.8 }}>精密な搬送技術で、<br />モノづくりの未来を支える。</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>商品カテゴリ</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8, display: 'grid', gap: '8px' }}>
              <li><Link to="/products" className="footer-link">コンベアローラ</Link></li>
              <li><Link to="/products" className="footer-link">搬送ベルト</Link></li>
              <li><Link to="/products" className="footer-link">ベアリングユニット</Link></li>
              <li><Link to="/products" className="footer-link">アルミフレーム</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>サポート</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8, display: 'grid', gap: '8px' }}>
              <li><Link to="/selection-guide" className="footer-link">選定ガイド</Link></li>
              <li><Link to="/cad-data" className="footer-link">CADデータ</Link></li>
              <li><Link to="/delivery-time" className="footer-link">納期確認</Link></li>
              <li><Link to="/contact" className="footer-link">お問合せ</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>会社情報</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8, display: 'grid', gap: '8px' }}>
              <li><Link to="/about" className="footer-link">会社概要</Link></li>
              <li><Link to="/careers" className="footer-link">採用情報</Link></li>
              <li><Link to="/privacy" className="footer-link">環境方針</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>
          &copy; 2026 RecruitDirect Corporation. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
