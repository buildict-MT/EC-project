import React from 'react';
import { Download } from 'lucide-react';

const CADData: React.FC = () => {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>CADデータダウンロード</h1>
      <p style={{ marginBottom: '40px', color: '#666' }}>設計にご利用いただける各種 CAD データを提供しています。</p>
      
      <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px' }}>
        <h3>提供形式</h3>
        <ul style={{ marginTop: '15px', display: 'grid', gap: '10px' }}>
          <li>2D: DXF, DWG</li>
          <li>3D: STEP, IGES, Parasolid</li>
        </ul>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>※各商品詳細ページから、選択した仕様に基づいたカスタムデータを生成・ダウンロードできます。</p>
      </div>
    </div>
  );
};

export default CADData;
