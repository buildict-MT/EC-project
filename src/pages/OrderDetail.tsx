import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Package, Clock, CheckCircle, AlertCircle, ArrowLeft, ShoppingCart, RefreshCw } from 'lucide-react';

interface OrderItem {
  id: number;
  product_id: number;
  base_name: string;
  category: string;
  specs: any;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    if (token && id) {
      fetch(`/api/orders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error('Order not found');
        return res.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [token, id]);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return { label: '承認待ち', color: '#f59e0b', icon: <Clock size={20} />, step: 1 };
      case 'approved':
        return { label: '承認済', color: 'var(--primary-color)', icon: <CheckCircle size={20} />, step: 2 };
      case 'manufacturing':
        return { label: '製造中', color: 'var(--primary-color)', icon: <RefreshCw size={20} />, step: 3 };
      case 'shipped':
        return { label: '出荷済', color: 'var(--primary-color)', icon: <Package size={20} />, step: 4 };
      case 'delivered':
        return { label: '配送完了', color: '#10b981', icon: <CheckCircle size={20} />, step: 5 };
      case 'rejected':
        return { label: '却下', color: '#ef4444', icon: <AlertCircle size={20} />, step: 0 };
      default:
        return { label: status, color: '#666', icon: null, step: 0 };
    }
  };

  const getEstimatedShippingDate = (dateStr: string) => {
    const date = new Date(dateStr);
    let count = 0;
    while (count < 3) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        count++;
      }
    }
    return date.toLocaleDateString();
  };

  const handleReorder = () => {
    if (!order) return;
    setReordering(true);
    
    order.items.forEach(item => {
      const { length, ...restSpecs } = item.specs;
      
      addToCart({
        id: item.product_id,
        base_name: item.base_name,
        category: item.category,
        specs: restSpecs,
        length: length || 300,
        price: item.unit_price,
        quantity: item.quantity
      });
    });

    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  if (loading) return <div className="container" style={{ padding: '80px 0' }}>読み込み中...</div>;
  if (!order) return <div className="container" style={{ padding: '80px 0' }}>注文が見つかりませんでした。</div>;

  const statusInfo = getStatusDisplay(order.status);
  const steps = [
    { label: '承認待ち', icon: <Clock size={16} /> },
    { label: '承認済', icon: <CheckCircle size={16} /> },
    { label: '製造中', icon: <RefreshCw size={16} /> },
    { label: '出荷済', icon: <Package size={16} /> },
    { label: '配送完了', icon: <CheckCircle size={16} /> }
  ];

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <Link to="/account" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', marginBottom: '30px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> 注文履歴に戻る
      </Link>

      {/* プログレスバー */}
      {order.status !== 'rejected' && (
        <div style={{ marginBottom: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '15px', left: '5%', right: '5%', height: '2px', backgroundColor: '#eee', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '15px', left: '5%', width: `${(Math.max(0, statusInfo.step - 1) / 4) * 90}%`, height: '2px', backgroundColor: 'var(--primary-color)', zIndex: 0, transition: 'width 0.5s ease' }}></div>
            
            {steps.map((s, idx) => (
              <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: statusInfo.step > idx ? 'var(--primary-color)' : statusInfo.step === idx + 1 ? 'white' : '#eee',
                  border: statusInfo.step === idx + 1 ? '2px solid var(--primary-color)' : 'none',
                  color: statusInfo.step > idx ? 'white' : statusInfo.step === idx + 1 ? 'var(--primary-color)' : '#999',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '10px'
                }}>
                  {statusInfo.step > idx + 1 ? <CheckCircle size={20} /> : s.icon}
                </div>
                <div style={{ fontSize: '12px', fontWeight: statusInfo.step === idx + 1 ? 'bold' : 'normal', color: statusInfo.step >= idx + 1 ? '#333' : '#999' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>注文番号: #{order.id}</h1>
          <div style={{ color: '#666' }}>注文日: {new Date(order.created_at).toLocaleString()}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: statusInfo.color, fontWeight: 'bold', fontSize: '18px', backgroundColor: `${statusInfo.color}10`, padding: '12px 24px', borderRadius: '30px' }}>
          {statusInfo.icon}
          {statusInfo.label}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>注文内容</h2>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '10px' }}>IMAGE</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: 'var(--primary-color)', fontWeight: 'bold' }}>{item.category}</div>
                <h3 style={{ fontSize: '18px', margin: '5px 0' }}>{item.base_name}</h3>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  仕様: {Object.entries(item.specs).filter(([k]) => k !== 'length').map(([k, v]) => `${v}`).join(' / ')} 
                  {item.specs.length ? ` / L${item.specs.length}mm` : ''}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <span style={{ color: '#666' }}>¥{item.unit_price.toLocaleString()} × {item.quantity}</span>
                  <span style={{ fontWeight: 'bold' }}>¥{(item.unit_price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>注文要約</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>商品合計</span>
              <span>¥{order.total_price.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span>送料</span>
              <span>¥0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', borderTop: '2px solid var(--primary-color)', paddingTop: '15px', color: 'var(--primary-color)' }}>
              <span>合計金額</span>
              <span>¥{order.total_price.toLocaleString()}</span>
            </div>

            <button 
              className="btn btn-accent" 
              style={{ width: '100%', marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '16px' }}
              onClick={handleReorder}
              disabled={reordering}
            >
              {reordering ? <RefreshCw size={18} className="spin" /> : <ShoppingCart size={18} />}
              {reordering ? 'カートに追加中...' : 'この内容で再注文'}
            </button>
          </div>
          
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '8px', fontSize: '13px', color: '#003366', lineHeight: '1.6' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Package size={14} /> お届けについて
            </div>
            {order.status === 'pending_approval' ? (
              '承認完了後に納期が確定いたします。'
            ) : order.status === 'rejected' ? (
              'この注文は却下されました。'
            ) : (
              <>出荷予定日: <span style={{ fontWeight: 'bold' }}>{getEstimatedShippingDate(order.created_at)}</span><br />通常、承認完了から 3〜5 営業日で出荷いたします。</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
