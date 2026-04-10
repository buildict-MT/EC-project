import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, FileText, Download, Check, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Spec {
  id: number;
  name: string;
  value: string;
  price_modifier: number;
}

interface ProductDetail {
  id: number;
  category: string;
  base_name: string;
  base_price: number;
  description: string;
  specs: Spec[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  
  // シミュレーション用ステート
  const [selectedSpecs, setSelectedSpecs] = useState<{ [key: string]: Spec }>({});
  const [length, setLength] = useState(300); // ローラの長さ (mm)
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        const initial: { [key: string]: Spec } = {};
        data.specs.forEach((s: Spec) => {
          if (!initial[s.name]) initial[s.name] = s;
        });
        setSelectedSpecs(initial);
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    let base = product.base_price;
    Object.values(selectedSpecs).forEach(s => {
      base += s.price_modifier;
    });
    base += Math.floor(length / 100) * 500;

    // ボリュームディスカウント
    let discount = 1.0;
    if (quantity >= 50) discount = 0.90;
    else if (quantity >= 10) discount = 0.95;

    const calculatedUnitPrice = Math.round(base * discount);
    setUnitPrice(calculatedUnitPrice);
    setTotalPrice(calculatedUnitPrice * quantity);
  }, [product, selectedSpecs, length, quantity]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const specs: { [key: string]: string } = {};
    Object.entries(selectedSpecs).forEach(([name, spec]) => {
      specs[name] = spec.value;
    });

    addToCart({
      id: product.id,
      base_name: product.base_name,
      category: product.category,
      specs,
      length,
      price: unitPrice,
      quantity: quantity
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDownloadCAD = () => {
    if (!product) return;
    
    const dia = selectedSpecs['diameter']?.value || '30';
    const mat = selectedSpecs['material']?.value || 'ST';
    
    // 簡易的な DXF テキストデータの生成
    const dxfContent = `0
SECTION
2
ENTITIES
0
CIRCLE
8
0
10
0.0
20
0.0
30
0.0
40
${parseInt(dia.replace('φ', '')) / 2}
0
LINE
8
0
10
0.0
20
0.0
30
0.0
11
${length}
21
0.0
31
0.0
0
ENDSEC
0
EOF`;

    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.base_name}_${dia}_L${length}.dxf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="container" style={{ padding: '80px 0' }}>読み込み中...</div>;
  if (!product) return <div className="container">商品が見つかりません。</div>;

  const handleSpecChange = (name: string, specId: number) => {
    const spec = product.specs.find(s => s.id === specId);
    if (spec) {
      setSelectedSpecs(prev => ({ ...prev, [name]: spec }));
    }
  };

  const rollerWidth = 300 + (length / 5);
  const rollerHeight = selectedSpecs['diameter']?.value === 'φ50' ? 60 : 40;

  return (
    <div className="container" style={{ margin: '60px auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
        
        <div>
          <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '12px', color: '#999', fontWeight: 'bold' }}>TECHNICAL PREVIEW</span>
            
            <svg width="100%" height="200" viewBox="0 0 800 200">
              <rect x={(800 - rollerWidth - 40) / 2} y="95" width={rollerWidth + 40} height="10" fill="#999" />
              <rect 
                x={(800 - rollerWidth) / 2} 
                y={100 - rollerHeight / 2} 
                width={rollerWidth} 
                height={rollerHeight} 
                fill={selectedSpecs['material']?.value === 'SUS' ? '#e0e0e0' : '#bbbbbb'} 
                stroke="#666" 
                strokeWidth="2"
              />
            </svg>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span style={{ fontFamily: 'Roboto Mono', fontSize: '14px', color: 'var(--primary-color)' }}>
                {selectedSpecs['diameter']?.value || 'φ--'} × L{length} ({selectedSpecs['material']?.value || 'ST'})
              </span>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <button 
              className="btn" 
              style={{ flex: 1, border: '1px solid var(--primary-color)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={handleDownloadCAD}
            >
              <Download size={18} /> CADデータ(DXF)
            </button>
            <button className="btn" style={{ flex: 1, border: '1px solid var(--primary-color)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FileText size={18} /> 仕様書(PDF)
            </button>
          </div>
        </div>

        <div>
          <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px' }}>{product.category}</span>
          <h1 style={{ fontSize: '32px', margin: '10px 0 20px', color: 'var(--primary-color)' }}>{product.base_name}</h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>{product.description}</p>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '30px' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>ローラ径</label>
              <select 
                className="btn" 
                style={{ width: '100%', border: '1px solid #ddd', backgroundColor: 'white', textAlign: 'left' }}
                onChange={(e) => handleSpecChange('diameter', parseInt(e.target.value))}
                value={selectedSpecs['diameter']?.id}
              >
                {product.specs.filter(s => s.name === 'diameter').map(s => (
                  <option key={s.id} value={s.id}>{s.value} (+¥{s.price_modifier})</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>材質</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.specs.filter(s => s.name === 'material').map(s => (
                  <button 
                    key={s.id} 
                    className="btn" 
                    style={{ 
                      flex: 1, 
                      border: selectedSpecs['material']?.id === s.id ? '2px solid var(--primary-color)' : '1px solid #ddd',
                      backgroundColor: selectedSpecs['material']?.id === s.id ? 'rgba(0,51,102,0.05)' : 'white',
                      color: selectedSpecs['material']?.id === s.id ? 'var(--primary-color)' : '#666'
                    }}
                    onClick={() => handleSpecChange('material', s.id)}
                  >
                    {s.value}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '14px' }}>ローラ幅 (L)</label>
                <span style={{ fontFamily: 'Roboto Mono', fontWeight: 'bold' }}>{length} mm</span>
              </div>
              <input 
                type="range" min="100" max="2000" step="10" value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-color)' }}
              />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>数量</label>
              <input 
                type="number" min="1" value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="btn"
                style={{ width: '100px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: 'white' }}
              />
              {quantity >= 10 && (
                <span style={{ marginLeft: '15px', color: '#10b981', fontSize: '14px', fontWeight: 'bold' }}>
                   <Info size={14} style={{ verticalAlign: 'middle' }} /> {quantity >= 50 ? '10% OFF 適用中' : '5% OFF 適用中'}
                </span>
              )}
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '4px', textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: '#666' }}>単価: ¥{unitPrice.toLocaleString()}</div>
              <span style={{ fontSize: '14px', color: '#666' }}>合計金額 (税込)</span>
              <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--primary-color)', margin: '5px 0 20px' }}>
                ¥{totalPrice.toLocaleString()}
              </div>
              <button 
                className="btn btn-accent" 
                style={{ width: '100%', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: added ? '#4caf50' : 'var(--accent-color)' }}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? <><Check size={22} /> カートに追加しました</> : <><ShoppingCart size={22} /> カートに入れる</>}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
