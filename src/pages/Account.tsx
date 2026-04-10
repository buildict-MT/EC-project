import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { History, Package, Clock, CheckCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
}

const Account: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [token]);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return { label: '承認待ち', color: '#f59e0b', icon: <Clock size={16} /> };
      case 'approved':
        return { label: '承認済', color: 'var(--primary-color)', icon: <CheckCircle size={16} /> };
      case 'manufacturing':
        return { label: '製造中', color: 'var(--primary-color)', icon: <RefreshCw size={16} /> };
      case 'shipped':
        return { label: '出荷済', color: 'var(--primary-color)', icon: <Package size={16} /> };
      case 'delivered':
        return { label: '配送完了', color: '#10b981', icon: <CheckCircle size={16} /> };
      case 'rejected':
        return { label: '却下', color: '#ef4444', icon: <AlertCircle size={16} /> };
      default:
        return { label: status, color: '#666', icon: null };
    }
  };

  if (!user) return <div className="container" style={{ padding: '100px 0' }}>ログインが必要です。</div>;

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
        
        {/* サイドバー: ユーザー情報 */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 15px' }}>
              {user.email[0].toUpperCase()}
            </div>
            <h2 style={{ fontSize: '18px', margin: '0 0 5px' }}>{user.email}</h2>
            <span style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>{user.role}</span>
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#999', display: 'block' }}>所属企業</label>
              <span style={{ fontWeight: 'bold' }}>{user.company_name}</span>
            </div>
            <button className="btn" style={{ width: '100%', border: '1px solid #ef4444', color: '#ef4444', marginTop: '20px' }} onClick={logout}>
              ログアウト
            </button>
          </div>
        </div>

        {/* メイン: 注文履歴 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <History size={24} color="var(--primary-color)" />
            <h1 style={{ fontSize: '24px' }}>注文・申請履歴</h1>
          </div>

          {loading ? (
            <p>読み込み中...</p>
          ) : orders.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
              <Package size={48} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
              <p>注文履歴がありません。</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {orders.map(order => {
                const status = getStatusDisplay(order.status);
                return (
                  <div key={order.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>注文番号: #{order.id}</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary-color)' }}>
                        ¥{order.total_price.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: status.color, fontWeight: 'bold', fontSize: '14px', backgroundColor: `${status.color}10`, padding: '6px 12px', borderRadius: '20px' }}>
                        {status.icon}
                        {status.label}
                      </div>
                      <Link to={`/orders/${order.id}`} className="btn" style={{ padding: '8px 12px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', textDecoration: 'none', color: 'inherit' }}>
                        詳細を表示 <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Account;
