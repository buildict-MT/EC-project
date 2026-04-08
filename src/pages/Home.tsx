import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Settings, Package, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">搬送を、変える。</h1>
          <p className="hero-subtitle">精密なエンジニアリングと、信頼の品質。<br />MonoDirect が、あなたの現場を最適化します。</p>
          <button className="btn btn-primary">製品カタログを見る</button>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">カテゴリーから探す</h2>
        <div className="category-grid">
          <div className="category-card">
            <Settings size={48} color="var(--primary-color)" />
            <h3>コンベアローラ</h3>
            <p className="text-light" style={{ fontSize: '14px', marginTop: '10px' }}>
              スチール、ステンレス、樹脂など、多種多様な径と仕様に対応。
            </p>
          </div>
          <div className="category-card">
            <Layers size={48} color="var(--primary-color)" />
            <h3>搬送ベルト</h3>
            <p className="text-light" style={{ fontSize: '14px', marginTop: '10px' }}>
              高耐久、低騒音、食品衛生対応など、現場のニーズに応えるラインナップ。
            </p>
          </div>
          <div className="category-card">
            <Package size={48} color="var(--primary-color)" />
            <h3>ベアリングユニット</h3>
            <p className="text-light" style={{ fontSize: '14px', marginTop: '10px' }}>
              確かな回転と長寿命を実現。各種フランジ、ピローブロックに対応。
            </p>
          </div>
        </div>

        <h2 className="section-title">新製品のご紹介</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} to="/products" style={{ border: '1px solid #eee', padding: '20px', borderRadius: '4px', display: 'block' }}>
              <div style={{ width: '100%', height: '180px', backgroundColor: '#f9f9f9', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#ccc', fontWeight: 'bold' }}>PRODUCT IMAGE</span>
              </div>
              <h4 style={{ color: 'var(--primary-color)' }}>高負荷対応ステンレスローラ CR-SUS-{i}00</h4>
              <p style={{ fontSize: '13px', color: '#666', margin: '10px 0' }}>耐食性に優れ、クリーン環境での使用に最適です。</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>¥5,800〜</span>
                <ChevronRight size={18} color="var(--primary-color)" />
              </div>
            </Link>
          ))}
        </div>

        {/* 特徴セクション */}
        <section style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '80px 40px', borderRadius: '8px', marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>MAKERZ Direct が選ばれる理由</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>精密なカスタマイズ</h4>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>ミリ単位の仕様選定により、現場に最適な部品をオンデマンドで提供します。</p>
            </div>
            <div>
              <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>短納期・低コスト</h4>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>独自の製造ネットワークにより、中間コストをカット。高品質な部品を迅速に届けます。</p>
            </div>
            <div>
              <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>設計支援</h4>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>全製品の CAD データ（DXF）を完備。設計業務の効率化を強力にバックアップします。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
