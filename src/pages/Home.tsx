import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, ShieldCheck, Zap, ArrowRight, BarChart3, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* ヒーローセクション */}
      <section className="hero" style={{ padding: '100px 0', background: 'linear-gradient(135deg, var(--primary-color) 0%, #004080 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>
            製造現場の「選定」を、<br />もっと自由に、もっと速く。
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
            RecruitDirect は、B2B 製造部品の即時選定・見積・発注システムです。<br />
            設計者の工数を削減し、調達のリードタイムをゼロへ。
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/products" className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              商品ラインナップを見る <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn" style={{ padding: '15px 40px', fontSize: '18px', border: '1px solid white', color: 'white' }}>
              ログイン / 新規登録
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: 'var(--primary-color)' }}>RecruitDirect が選ばれる理由</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent-color)', margin: '20px auto' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: 'rgba(0,51,102,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
                <Settings size={32} />
              </div>
              <h3 style={{ marginBottom: '15px' }}>即時シミュレーション</h3>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>パラメータを選択するだけで、形状プレビューと価格をリアルタイムに算出。設計の試行錯誤を止めません。</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: 'rgba(0,51,102,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ marginBottom: '15px' }}>B2B 承認ワークフロー</h3>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>組織内での承認フローをシステム化。発注担当者から承認者への申請・承認がシームレスに完結します。</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: 'rgba(0,51,102,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
                <Zap size={32} />
              </div>
              <h3 style={{ marginBottom: '15px' }}>CADデータの即時提供</h3>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>選定した仕様に基づいた CAD データをその場で提供。設計工程への統合をスムーズにします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 数値セクション */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <BarChart3 size={40} color="var(--primary-color)" style={{ marginBottom: '10px' }} />
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary-color)' }}>90%</div>
              <div style={{ fontSize: '14px', color: '#666' }}>見積待ち時間の削減</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Users size={40} color="var(--primary-color)" style={{ marginBottom: '10px' }} />
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary-color)' }}>1,200社</div>
              <div style={{ fontSize: '14px', color: '#666' }}>導入企業実績</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ShieldCheck size={40} color="var(--primary-color)" style={{ marginBottom: '10px' }} />
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary-color)' }}>0.1%</div>
              <div style={{ fontSize: '14px', color: '#666' }}>選定ミス発生率</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>あなたの現場を、RecruitDirect で最適化しませんか？</h2>
          <Link to="/getting-started" className="btn btn-primary" style={{ padding: '15px 50px', fontSize: '18px' }}>
            今すぐ無料選定を始める
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
