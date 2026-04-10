import React from 'react';

const SelectionGuide: React.FC = () => {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>選定ガイド</h1>
      <p style={{ marginBottom: '40px', color: '#666' }}>用途や環境に合わせた最適なコンベアローラの選定方法をご案内します。</p>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', borderLeft: '5px solid var(--accent-color)', paddingLeft: '15px', marginBottom: '20px' }}>1. 搬送物の重量から選ぶ</h2>
        <p>搬送物1個あたりの重量と、同時に載る個数から、ローラ1本あたりの耐荷重を算出します。</p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', borderLeft: '5px solid var(--accent-color)', paddingLeft: '15px', marginBottom: '20px' }}>2. 使用環境から材質を選ぶ</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li><strong>スチール (ST):</strong> 一般的な屋内環境、乾燥した場所。</li>
          <li><strong>ステンレス (SUS):</strong> 水気のある場所、食品工場、クリーンルーム。</li>
        </ul>
      </section>
    </div>
  );
};

export default SelectionGuide;
