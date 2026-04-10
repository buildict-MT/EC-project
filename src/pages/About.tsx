import React from 'react';
import { Target, Award, MapPin, Calendar, Building2, Globe, Users } from 'lucide-react';

const About: React.FC = () => {
  const history = [
    { year: '2010年 4月', event: 'RecruitDirect 株式会社設立（東京都港区）' },
    { year: '2013年 8月', event: '製造部品 B2B プラットフォーム「RecruitDirect」β版を公開' },
    { year: '2016年 3月', event: 'CADデータ自動生成エンジンの独自開発に成功' },
    { year: '2019年11月', event: '導入企業数が 500社を突破' },
    { year: '2023年 6月', event: '次世代物流自動化ソリューション部門を新設' },
    { year: '2025年 1月', event: '導入企業数が 1,200社を突破' }
  ];

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      {/* ヒーローセクション */}
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '40px', marginBottom: '20px' }}>会社案内</h1>
        <p style={{ color: '#666', fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
          「調達の壁を取り払い、エンジニアに創造の自由を。」<br />
          私たちは、製造現場の DX を牽引し、日本のモノづくりの競争力を高めます。
        </p>
      </div>

      {/* ミッション & ビジョン */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
        <div style={{ padding: '40px', backgroundColor: 'var(--secondary-color)', borderRadius: '12px' }}>
          <div style={{ color: 'var(--primary-color)', marginBottom: '20px' }}><Target size={40} /></div>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>ミッション</h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            複雑な部品選定と煩雑な見積プロセスをデジタル化し、設計から調達までのリードタイムを極限まで短縮します。
          </p>
        </div>
        <div style={{ padding: '40px', backgroundColor: 'rgba(255,153,0,0.05)', borderRadius: '12px', border: '1px solid rgba(255,153,0,0.2)' }}>
          <div style={{ color: 'var(--accent-color)', marginBottom: '20px' }}><Globe size={40} /></div>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>ビジョン</h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            世界中の製造リソースをネットワーク化し、あらゆるアイデアが即座にカタチになる「オンデマンド・マニュファクチャリング」の基盤を創ります。
          </p>
        </div>
      </div>

      {/* 会社概要テーブル */}
      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--primary-color)', marginBottom: '30px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>
          企業情報
        </h2>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#eee', border: '1px solid #eee' }}>
          {[
            { label: '会社名', value: 'RecruitDirect 株式会社 (RecruitDirect Corporation)', icon: <Building2 size={18} /> },
            { label: '設立', value: '2010年 4月 1日', icon: <Calendar size={18} /> },
            { label: '資本金', value: '5億 8,000万円', icon: <Award size={18} /> },
            { label: '所在地', value: '〒650-0042 兵庫県神戸市中央区波止場町 5-4 KOBEビル', icon: <MapPin size={18} /> },
            { label: '代表者', value: <>{'代表取締役社長　田中 工'}<br />{'取締役　松本智紀'}<br />{'取締役　佐藤 健太'}</>, icon: <Users size={18} /> },
            { label: '従業員数', value: '120名（パート・アルバイト含む）', icon: <Users size={18} /> },
            { label: '事業内容', value: '製造部品 B2B EC サイトの運営、設計支援ツールの開発、物流コンサルティング', icon: <Target size={18} /> }
          ].map((item, index) => (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '250px 1fr', backgroundColor: 'white' }}>
              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', fontWeight: 'bold', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.icon} {item.label}
              </div>
              <div style={{ padding: '20px', color: '#333', lineHeight: '1.6' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 沿革 */}
      <section>
        <h2 style={{ fontSize: '28px', color: 'var(--primary-color)', marginBottom: '30px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>
          沿革
        </h2>
        <div style={{ paddingLeft: '20px', borderLeft: '2px solid #eee', marginLeft: '10px' }}>
          {history.map((h, index) => (
            <div key={index} style={{ position: 'relative', marginBottom: '30px', paddingLeft: '30px' }}>
              <div style={{ 
                position: 'absolute', left: '-11px', top: '0', 
                width: '20px', height: '20px', borderRadius: '50%', 
                backgroundColor: 'white', border: '4px solid var(--primary-color)' 
              }}></div>
              <div style={{ fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '5px' }}>{h.year}</div>
              <div style={{ color: '#666' }}>{h.event}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
