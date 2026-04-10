import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Rocket, Users, MessageCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const Careers: React.FC = () => {
  const jobs = [
    { 
      title: 'フルスタックエンジニア', 
      type: '正社員 / リモート可', 
      location: '東京オフィス / リモート',
      desc: '設計者が直感的に操作できる 3D シミュレーターの開発や、複雑な注文・承認ワークフローを支えるバックエンドの設計・実装を担当します。' 
    },
    { 
      title: 'プロダクトマネージャー', 
      type: '正社員', 
      location: '東京オフィス',
      desc: '製造業のドメイン知識を活かし、ユーザー体験（UX）を最大化する新機能のロードマップ策定、優先順位付け、仕様策定をリードします。' 
    },
    { 
      title: 'カスタマーサクセス (B2B)', 
      type: '正社員 / リモート可', 
      location: '東京オフィス / リモート',
      desc: '導入企業に対して、当システムを活用した「調達業務の改善」を提案。ユーザーからのフィードバックを抽出し、プロダクト開発へ繋げます。' 
    }
  ];

  return (
    <div className="careers">
      {/* ヒーローセクション */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: 'linear-gradient(rgba(0,51,102,0.9), rgba(0,51,102,0.9)), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>
            モノづくりの「調達」を、<br />ゼロから再定義する。
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9, maxWidth: '800px', margin: '0 auto 40px' }}>
            RecruitDirect は、日本の基幹産業である製造業に、<br />
            テクノロジーによる「自由」と「スピード」をもたらすチームです。
          </p>
          <a href="#positions" className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '18px' }}>
            募集職種を見る
          </a>
        </div>
      </section>

      {/* 働く環境 / 特徴 */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: 'var(--primary-color)' }}>働く環境とカルチャー</h2>
            <p style={{ color: '#666', marginTop: '10px' }}>最高のパフォーマンスを発揮するための仕組みを整えています。</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: <Clock size={32} />, title: 'フルフレックス制', desc: 'コアタイムなしのフルフレックスを採用。個人のライフスタイルに合わせた最適なパフォーマンスを重視します。' },
              { icon: <Rocket size={32} />, title: '最新の技術スタック', desc: 'React, TypeScript, Node.js を中心に、常に最適な技術を選択。モダンな開発環境で挑戦できます。' },
              { icon: <Heart size={32} />, title: 'スキルアップ支援', desc: '技術書、カンファレンス、英語学習、資格取得など、あなたの成長を会社が全面的にバックアップ。' },
              { icon: <Users size={32} />, title: '多様なバックグラウンド', desc: 'IT系だけでなく、製造業出身者も多数在籍。専門性を掛け合わせ、唯一無二のプロダクトを創ります。' }
            ].map((item, index) => (
              <div key={index} style={{ padding: '30px', border: '1px solid #f0f0f0', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-color)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 採用プロセス */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h2 style={{ fontSize: '30px', color: 'var(--primary-color)', textAlign: 'center', marginBottom: '50px' }}>選考プロセス</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {[
              { step: '01', title: 'カジュアル面談', desc: 'まずはお互いを知る場として。' },
              { step: '02', title: '書類・技術選考', desc: 'ポートフォリオ等の確認。' },
              { step: '03', title: 'チーム面接', desc: '現場メンバーとの対話。' },
              { step: '04', title: '最終面接', desc: '代表・役員との面接。' },
              { step: '05', title: '内定', desc: '共にモノづくりを！' }
            ].map((p, index) => (
              <div key={index} style={{ flex: '1', minWidth: '180px', padding: '25px', backgroundColor: 'white', borderRadius: '8px', borderBottom: '4px solid var(--primary-color)', position: 'relative' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-color)' }}>STEP {p.step}</span>
                <h4 style={{ margin: '10px 0', fontSize: '16px' }}>{p.title}</h4>
                <p style={{ fontSize: '13px', color: '#888' }}>{p.desc}</p>
                {index < 4 && <ArrowRight size={20} style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', color: '#ccc', zIndex: '1' }} className="process-arrow" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 募集職種一覧 */}
      <section id="positions" style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', color: 'var(--primary-color)', marginBottom: '40px' }}>募集中の職種</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {jobs.map((job, index) => (
              <div key={index} style={{ padding: '40px', border: '1px solid #eee', borderRadius: '12px', transition: 'all 0.3s' }} className="job-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '12px', backgroundColor: 'rgba(0,51,102,0.1)', color: 'var(--primary-color)', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>{job.type}</span>
                      <span style={{ fontSize: '12px', backgroundColor: '#f0f0f0', color: '#666', padding: '4px 10px', borderRadius: '4px' }}>{job.location}</span>
                    </div>
                    <h3 style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--primary-color)' }}>{job.title}</h3>
                    <p style={{ color: '#666', lineHeight: '1.7', maxWidth: '700px' }}>{job.desc}</p>
                  </div>
                  <Link to="/careers/apply" className="btn btn-primary" style={{ padding: '12px 35px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={18} /> エントリーする
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問合せ */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--primary-color)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>カジュアルにお話ししませんか？</h2>
          <p style={{ opacity: 0.9, marginBottom: '30px' }}>
            募集中の職種に興味がある方も、会社の雰囲気を知りたい方も大歓迎です。
          </p>
          <Link to="/careers/casual" className="btn btn-accent" style={{ padding: '15px 50px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', width: 'fit-content' }}>
            <MessageCircle size={22} /> 採用担当とカジュアル面談
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Careers;
