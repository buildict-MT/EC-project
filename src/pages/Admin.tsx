import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = () => {
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
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (err) {
      alert('ステータスの更新に失敗しました');
    }
  };

  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true;
    if (filter === 'pending') return o.status === 'pending_approval';
    if (filter === 'active') return ['approved', 'manufacturing', 'shipped'].includes(o.status);
    if (filter === 'completed') return o.status === 'delivered';
    return true;
  });

  if (!user || (user.role !== 'admin' && user.role !== 'approver')) {
    return <div className="container" style={{ padding: '100px 0' }}>このページにアクセスする権限がありません。</div>;
  }

  const stats = {
    pending: orders.filter(o => o.status === 'pending_approval').length,
    total: orders.length,
    users: 3
  };

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
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pending}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>承認待ち注文</div>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: 'rgba(16,185,129,0.05)', padding: '15px', borderRadius: '50%', color: '#10b981' }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>総注文数</div>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: 'rgba(0,51,102,0.05)', padding: '15px', borderRadius: '50%', color: 'var(--primary-color)' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.users}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>登録ユーザー</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '0' }}>
        {[
          { id: 'all', label: 'すべての注文' },
          { id: 'pending', label: '承認待ち' },
          { id: 'active', label: '進行中' },
          { id: 'completed', label: '完了' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              color: filter === tab.id ? 'var(--primary-color)' : '#999',
              borderBottom: filter === tab.id ? '3px solid var(--primary-color)' : '3px solid transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : filteredOrders.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
          注文は見つかりませんでした。
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredOrders.map(order => (
            <div key={order.id} style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderLeft: `4px solid ${
                order.status === 'pending_approval' ? '#f59e0b' : 
                order.status === 'delivered' ? '#10b981' : 
                order.status === 'rejected' ? '#ef4444' : 'var(--primary-color)'
              }`
            }}>
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
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <option value="pending_approval">承認待ち</option>
                  <option value="approved">承認済 / 手配中</option>
                  <option value="manufacturing">製造中</option>
                  <option value="shipped">出荷済</option>
                  <option value="delivered">配送完了</option>
                  <option value="rejected">却下</option>
                </select>
                
                <Link to={`/orders/${order.id}`} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', textDecoration: 'none', color: 'inherit', padding: '8px 16px' }}>
                  <ExternalLink size={18} /> 詳細
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
