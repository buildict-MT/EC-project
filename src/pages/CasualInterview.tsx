import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Calendar, Send } from 'lucide-react';

const CasualInterview: React.FC = () => {
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
        <CheckCircle size={64} color="#3b82f6" style={{ marginBottom: '20px' }} />
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>面談リクエストを承りました</h1>
        <p style={{ color: '#666' }}>お問合せありがとうございます。近日中に採用担当より日程調整のご連絡を差し上げます。</p>
        <a href="/careers" className="btn btn-primary" style={{ marginTop: '40px', backgroundColor: '#3b82f6' }}>採用TOPへ戻る</a>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 0', maxWidth: '700px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '32px', marginBottom: '15px' }}>カジュアル面談リクエスト</h1>
        <p style={{ color: '#666' }}>選考とは関係なく、まずはオンラインでフランクにお話ししましょう。</p>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>お名前</label>
          <input type="text" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>現在の所属 / 職業</label>
          <input type="text" className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left' }} required placeholder="〇〇株式会社 エンジニアなど" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>お話ししたい内容 (複数可)</label>
          <div style={{ display: 'grid', gap: '10px', padding: '10px' }}>
            {['会社のビジョンについて', '技術スタックについて', 'チームの雰囲気について', '具体的な業務内容について'].map((text, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" /> {text}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>面談希望日時の目安</label>
          <textarea className="btn" style={{ width: '100%', border: '1px solid #ddd', textAlign: 'left', height: '80px' }} placeholder="来週の平日18時以降など"></textarea>
        </div>

        <button type="submit" className="btn" style={{ width: '100%', padding: '15px', fontSize: '18px', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : <><MessageCircle size={20} /> カジュアル面談を申し込む</>}
        </button>
      </form>
    </div>
  );
};

export default CasualInterview;
