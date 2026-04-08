import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px' }}>MonoDirect</h3>
            <p style={{ opacity: 0.8 }}>精密な搬送技術で、<br />モノづくりの未来を支える。</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>商品カテゴリ</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8 }}>
              <li>コンベアローラ</li>
              <li>搬送ベルト</li>
              <li>ベアリングユニット</li>
              <li>アルミフレーム</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>サポート</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8 }}>
              <li>選定ガイド</li>
              <li>CADデータ</li>
              <li>納期確認</li>
              <li>お問合せ</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>会社情報</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8 }}>
              <li>会社概要</li>
              <li>採用情報</li>
              <li>環境方針</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>
          &copy; 2026 MonoDirect Corporation. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
