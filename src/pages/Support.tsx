import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, FileText, Clock, Mail, ChevronRight } from 'lucide-react';

const Support: React.FC = () => {
  const supportItems = [
    { 
      icon: <HelpCircle size={32} />, 
      title: '選定ガイド', 
      desc: '用途に合わせた最適なローラの選び方を解説します。',
      link: '/selection-guide'
    },
    { 
      icon: <FileText size={32} />, 
      title: 'CADデータ', 
      desc: '各種2D/3D CADデータのダウンロード方法について。',
      link: '/cad-data'
    },
    { 
      icon: <Clock size={32} />, 
      title: '納期確認', 
      desc: '現在の標準納期と特注品の対応状況について。',
      link: '/delivery-time'
    },
    { 
      icon: <Mail size={32} />, 
      title: 'お問合せ', 
      desc: '技術的なご相談、お見積り依頼はこちらから。',
      link: '/contact'
    }
  ];

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '36px', marginBottom: '20px' }}>サポートセンター</h1>
        <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto' }}>
          製品の選定から導入後のアフターサポートまで、お客様の設計・開発を全面的にバックアップいたします。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        {supportItems.map((item, index) => (
          <div key={index} style={{ padding: '40px', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center', transition: 'transform 0.3s', backgroundColor: 'white' }} className="category-card">
            <div style={{ color: 'var(--primary-color)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
            <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', height: '60px', overflow: 'hidden' }}>{item.desc}</p>
            <Link to={item.link} className="btn" style={{ marginTop: '20px', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              詳細を見る <ChevronRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '80px', backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
        <div>
          <h3 style={{ marginBottom: '10px' }}>解決しない場合は直接お問合せください</h3>
          <p style={{ color: '#666' }}>技術スタッフが迅速に回答いたします。お電話でのご相談も承っております。</p>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#888' }}>お電話でのお問合せ</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>03-1234-5678</div>
          </div>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '15px 40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={20} /> メールでお問合せ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;
