import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // 送信シミュレーション
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#f0fdf4', padding: '60px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
          <CheckCircle size={64} color="#16a34a" style={{ marginBottom: '20px' }} />
          <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>お問合せを受け付けました</h1>
          <p style={{ color: '#666', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
            お問合せいただきありがとうございます。入力いただいたメールアドレス宛に自動返信メールを送信しました。<br />
            通常 1〜2 営業日以内に、担当者より改めてご連絡させていただきます。
          </p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="btn btn-primary" 
            style={{ marginTop: '40px', padding: '12px 40px' }}
          >
            トップページへ戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '36px', marginBottom: '20px' }}>お問合せ</h1>
        <p style={{ color: '#666' }}>製品に関するご質問、お見積り依頼、技術的なご相談など、お気軽にお問合せください。</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px' }}>
        {/* 左側: フォーム */}
        <div>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', border: '1px solid #eee', borderRadius: '12px' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>お問合せ種別 <span style={{ color: '#ff4444', fontSize: '12px' }}>[必須]</span></label>
              <select className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left', backgroundColor: 'white' }} required>
                <option value="">選択してください</option>
                <option value="product">製品の仕様について</option>
                <option value="quote">見積り依頼</option>
                <option value="technical">技術的なご相談</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>会社名 <span style={{ color: '#ff4444', fontSize: '12px' }}>[必須]</span></label>
                <input type="text" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required placeholder="株式会社〇〇" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>お名前 <span style={{ color: '#ff4444', fontSize: '12px' }}>[必須]</span></label>
                <input type="text" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required placeholder="山田 太郎" />
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>メールアドレス <span style={{ color: '#ff4444', fontSize: '12px' }}>[必須]</span></label>
              <input type="email" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required placeholder="example@company.com" />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>お問合せ内容 <span style={{ color: '#ff4444', fontSize: '12px' }}>[必須]</span></label>
              <textarea className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left', height: '150px', lineHeight: '1.6', padding: '15px' }} required placeholder="お問合せ内容を詳しくご記入ください"></textarea>
            </div>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontSize: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: '4px' }} />
                <span><a href="/privacy" target="_blank" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>個人情報の取り扱い</a>について同意する</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '15px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : <><Send size={20} /> 入力内容を送信する</>}
            </button>
          </form>
        </div>

        {/* 右側: 連絡先情報 */}
        <div>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--primary-color)', marginBottom: '20px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>
              お電話でのお問合せ
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <div style={{ backgroundColor: 'rgba(0,51,102,0.05)', padding: '12px', borderRadius: '50%', color: 'var(--primary-color)' }}>
                <Phone size={24} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>03-1234-5678</div>
                <div style={{ fontSize: '13px', color: '#666' }}>受付時間: 平日 9:00〜18:00</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#888', marginTop: '10px', lineHeight: '1.5' }}>
              ※技術的なご相談は、担当技術者が対応させていただきます。
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--primary-color)', marginBottom: '20px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>
              よくあるご質問
            </h3>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '15px' }}>
              <li>
                <a href="/selection-guide" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontSize: '15px' }}>・ローラの選定方法を知りたい</a>
              </li>
              <li>
                <a href="/cad-data" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontSize: '15px' }}>・CADデータの形式を確認したい</a>
              </li>
              <li>
                <a href="/delivery-time" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontSize: '15px' }}>・現在の納期を知りたい</a>
              </li>
            </ul>
          </div>

          <div style={{ padding: '30px', border: '1px solid var(--accent-color)', borderRadius: '12px', backgroundColor: 'rgba(255,153,0,0.02)' }}>
            <h4 style={{ color: 'var(--accent-color)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} /> お急ぎの方へ
            </h4>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
              お急ぎの場合は、お電話にてその旨をお伝えください。在庫品であれば当日出荷も可能です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
