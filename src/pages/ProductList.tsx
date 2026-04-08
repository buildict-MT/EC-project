import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter, Search } from 'lucide-react';

interface Product {
  id: number;
  category: string;
  base_name: string;
  base_price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.base_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) return <div className="container" style={{ padding: '80px 0' }}>読み込み中...</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
        
        {/* サイドバー: フィルタ */}
        <aside>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={18} /> キーワード検索
            </h3>
            <input 
              type="text" 
              placeholder="商品名、型番..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="btn"
              style={{ width: '100%', textAlign: 'left', border: '1px solid #ddd', padding: '10px 15px', backgroundColor: 'white' }}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> カテゴリ
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="btn"
                  style={{ 
                    width: '100%', 
                    textAlign: 'left', 
                    padding: '10px 15px',
                    border: selectedCategory === cat ? '2px solid var(--primary-color)' : '1px solid #ddd',
                    backgroundColor: selectedCategory === cat ? 'rgba(0,51,102,0.05)' : 'white',
                    color: selectedCategory === cat ? 'var(--primary-color)' : '#666',
                    textTransform: 'capitalize',
                    fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                  }}
                >
                  {cat === 'all' ? '全カテゴリー' : cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* メイン: 商品リスト */}
        <main>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h1 style={{ color: 'var(--primary-color)', fontSize: '28px' }}>商品一覧 ({filteredProducts.length})</h1>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', color: '#999' }}>
              条件に一致する商品が見つかりませんでした。
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/products/${product.id}`} className="category-card" style={{ textAlign: 'left', padding: '0', overflow: 'hidden', textDecoration: 'none' }}>
                  <div style={{ width: '100%', height: '180px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#aaa', fontSize: '11px', fontWeight: 'bold' }}>{product.category.toUpperCase()} PREVIEW</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category}</span>
                    <h3 style={{ margin: '8px 0', fontSize: '18px', color: 'var(--text-color)' }}>{product.base_name}</h3>
                    <p style={{ color: '#666', fontSize: '13px', height: '40px', overflow: 'hidden', marginBottom: '15px' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-color)' }}>¥{product.base_price.toLocaleString()}〜</span>
                      <ChevronRight size={18} color="var(--primary-color)" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
