import React, { useState } from 'react';
import { Send, CheckCircle, FileText, Upload } from 'lucide-react';

const JobApplication: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <CheckCircle size={64} color="#16a34a" style={{ marginBottom: '20px' }} />
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>応募を受け付けました</h1>
        <p style={{ color: '#666' }}>エントリーありがとうございます。選考結果については、通常 1週間以内にご連絡いたします。</p>
        <a href="/careers" className="btn btn-primary" style={{ marginTop: '40px' }}>採用TOPへ戻る</a>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 0', maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '40px', textAlign: 'center' }}>エントリーフォーム</h1>
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', border: '1px solid #eee', borderRadius: '12px' }}>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>希望職種</label>
          <select className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left', backgroundColor: 'white' }} required>
            <option value="">職種を選択してください</option>
            <option value="eng">フルスタックエンジニア</option>
            <option value="pm">プロダクトマネージャー</option>
            <option value="cs">カスタマーサクセス (B2B)</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>お名前</label>
            <input type="text" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>メールアドレス</label>
            <input type="email" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required />
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>履歴書・ポートフォリオ (URL等)</label>
          <input type="text" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} placeholder="Google Drive や GitHub のURL" />
          <div style={{ marginTop: '10px', padding: '20px', border: '2px dashed #eee', borderRadius: '8px', textAlign: 'center', color: '#888' }}>
            <Upload size={24} style={{ marginBottom: '10px' }} />
            <div>ファイルをドラッグ＆ドロップ (シミュレーション)</div>
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>自己PR・志望動機</label>
          <textarea className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left', height: '150px' }} required></textarea>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : <><Send size={20} /> この内容で応募する</>}
        </button>
      </form>
    </div>
  );
};

export default JobApplication;
