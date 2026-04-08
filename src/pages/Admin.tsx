import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { ShieldCheck, CheckCircle, XCircle, Clock, ExternalLink, Users, Package } from 'lucide-react';

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  user_id: number;
}

const Admin: React.FC = () => {
  const { user, token } = useAuth();
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    if (token) {
      fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        // 全注文を取得（バックエンドが会社単位で返すと仮定）
        // 承認待ちを優先表示
        setPendingOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleApprove = async (orderId: number) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (err) {
      alert('承認処理に失敗しました');
    }
  };

  if (!user || (user.role !== 'admin' && user.role !== 'approver')) {
    return <div className="container" style={{ padding: '100px 0' }}>このページにアクセスする権限がありません。</div>;
  }

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <ShieldCheck size={32} color="var(--primary-color)" />
        <h1 style={{ fontSize: '32px' }}>管理コンソール</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: 'rgba(0,51,102,0.05)', padding: '15px', borderRadius: '50%', color: 'var(--primary-color)' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{pendingOrders.filter(o => o.status === 'pending_approval').length}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>承認待ち注文</div>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: 'rgba(16,185,129,0.05)', padding: '15px', borderRadius: '50%', color: '#10b981' }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{pendingOrders.length}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>総注文数</div>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: 'rgba(0,51,102,0.05)', padding: '15px', borderRadius: '50%', color: 'var(--primary-color)' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
            <div style={{ fontSize: '14px', color: '#666' }}>登録ユーザー</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Clock size={20} /> 承認待ちの注文・申請
      </h2>

      {loading ? (
        <p>読み込み中...</p>
      ) : pendingOrders.filter(o => o.status === 'pending_approval').length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
          承認待ちの注文はありません。
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {pendingOrders.filter(o => o.status === 'pending_approval').map(order => (
            <div key={order.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #f59e0b' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>注文番号: #{order.id}</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                  <span style={{ fontSize: '12px', color: '#999' }}>User ID: {order.user_id}</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary-color)' }}>
                  ¥{order.total_price.toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleApprove(order.id)}
                  className="btn btn-primary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#10b981' }}
                >
                  <CheckCircle size={18} /> 承認
                </button>
                <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ef4444', color: '#ef4444' }}>
                  <XCircle size={18} /> 却下
                </button>
                <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd' }}>
                  <ExternalLink size={18} /> 詳細
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
