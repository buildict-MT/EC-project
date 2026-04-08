import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'ログインに失敗しました');
      }

      login(data.token, data.user);
      navigate('/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '450px', margin: '100px auto', padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '28px', marginBottom: '10px' }}>RecruitDirect</h1>
        <p style={{ color: '#666' }}>B2B部品選定システム ログイン</p>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fff5f5', color: '#c53030', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', border: '1px solid #feb2b2' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>メールアドレス</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="btn"
              placeholder="example@company.com"
              style={{ width: '100%', paddingLeft: '40px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: 'white' }}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>パスワード</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="btn"
              placeholder="••••••••"
              style={{ width: '100%', paddingLeft: '40px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: 'white' }}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          disabled={loading}
        >
          {loading ? '認証中...' : <><LogIn size={20} /> ログイン</>}
        </button>
      </form>

      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        <p>アカウントをお持ちでない場合は、貴社管理者にお問い合わせください。</p>
        <p style={{ marginTop: '10px' }}>テスト用: admin@example.com / password123</p>
      </div>
    </div>
  );
};

export default Login;
