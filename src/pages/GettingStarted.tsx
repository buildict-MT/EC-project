import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, ShieldCheck, Zap, ArrowRight, UserPlus, Search, FileText } from 'lucide-react';

const GettingStarted: React.FC = () => {
  const steps = [
    { icon: <Search size={32} />, title: '1. 商品・カテゴリを選択', desc: '1,000点以上のラインナップから、必要な部品を選択します。' },
    { icon: <Settings size={32} />, title: '2. 仕様をカスタマイズ', desc: '径、長さ、材質などを指定。価格と形状が即座に更新されます。' },
    { icon: <FileText size={32} />, title: '3. 見積・CAD取得', desc: '選定した仕様で PDF 見積書や DXF データをその場で発行。' }
  ];

  const categories = [
    { name: 'コンベアローラ', id: 'roller', count: 450 },
    { name: '搬送ベルト', id: 'belt', count: 120 },
    { name: 'ベアリング', id: 'bearing', count: 200 },
    { name: 'モータ・駆動', id: 'motor', count: 80 }
  ];

  return (
    <div className="getting-started">
      {/* ヒーロー */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', color: 'var(--primary-color)', marginBottom: '20px' }}>
            RecruitDirect で、設計から調達をシームレスに。
          </h1>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto 40px' }}>
            数分で完了する選定シミュレーション。見積待ちの時間を、本来のクリエイティブな設計時間へ。
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '18px' }}>
              商品一覧から探す
            </Link>
            <Link to="/login" className="btn" style={{ padding: '15px 40px', fontSize: '18px', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>
              無料で会員登録
            </Link>
          </div>
        </div>
      </section>

      {/* ステップ解説 */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>導入までの流れ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0,51,102,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
                  {step.icon}
                </div>
                <h3 style={{ marginBottom: '15px' }}>{step.title}</h3>
                <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>{step.desc}</p>
                {i < 2 && <ArrowRight size={24} style={{ position: 'absolute', right: '-30px', top: '40px', color: '#ddd' }} className="hide-mobile" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* カテゴリクイックアクセス */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h2 style={{ marginBottom: '40px' }}>主要カテゴリから選定を始める</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {categories.map((cat, i) => (
              <Link key={i} to={`/products`} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }} className="category-card">
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>{cat.name}</h4>
                  <span style={{ fontSize: '12px', color: '#999' }}>登録数: {cat.count}点+</span>
                </div>
                <ArrowRight size={20} color="var(--primary-color)" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 会員登録のメリット */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ backgroundColor: 'var(--primary-color)', borderRadius: '16px', padding: '60px', color: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>B2B アカウントでさらに便利に</h2>
            <p style={{ opacity: 0.8 }}>法人のお客様は、以下の機能がすべて無料でご利用いただけます。</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            {[
              { title: '承認ワークフロー', desc: '組織内の購入申請・承認をシステム上で完結。' },
              { title: '掛売（請求書払い）', desc: '審査後、月締めの一括お支払いに対応。' },
              { title: 'マイページ管理', desc: '過去の選定仕様の保存、再注文がスムーズ。' },
              { title: 'ボリューム割引', desc: '大口注文時の自動割引適用。' }
            ].map((m, i) => (
              <div key={i} style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <CheckCircle size={20} style={{ color: 'var(--accent-color)', marginBottom: '10px' }} />
                <h4 style={{ marginBottom: '10px' }}>{m.title}</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/login" className="btn btn-accent" style={{ padding: '15px 60px', fontSize: '18px', fontWeight: 'bold' }}>
              <UserPlus size={20} style={{ marginRight: '10px' }} /> 今すぐ無料登録して始める
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const CheckCircle = ({ size, style }: { size: number, style: any }) => (
  <svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default GettingStarted;
