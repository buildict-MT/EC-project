import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter } from 'lucide-react';

interface Product {
  id: number;
  category: string;
  base_name: string;
  base_price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="container" style={{ padding: '80px 0' }}>読み込み中...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '40px 0 20px' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>商品一覧</h1>
        <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-color)' }}>
          <Filter size={18} /> フィルタ
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '80px' }}>
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="category-card" style={{ textAlign: 'left', padding: '0', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '200px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#ccc', fontSize: '12px' }}>IMAGE: {product.category.toUpperCase()}</span>
            </div>
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category}</span>
              <h3 style={{ margin: '8px 0', fontSize: '18px' }}>{product.base_name}</h3>
              <p style={{ color: '#666', fontSize: '13px', height: '40px', overflow: 'hidden' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>¥{product.base_price.toLocaleString()}〜</span>
                <ChevronRight size={18} color="var(--primary-color)" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
