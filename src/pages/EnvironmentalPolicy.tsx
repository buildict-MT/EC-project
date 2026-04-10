import React from 'react';

const EnvironmentalPolicy: React.FC = () => {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>環境方針</h1>
      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '8px', lineHeight: '2' }}>
        <p>RecruitDirect 株式会社は、持続可能な社会の実現に向けて、以下の環境方針を定めています。</p>
        <ol style={{ marginTop: '20px', paddingLeft: '20px' }}>
          <li>省資源・省エネルギーの推進</li>
          <li>廃棄物の削減とリサイクルの促進</li>
          <li>環境負荷の少ない製品の優先的な取り扱い</li>
          <li>環境関連法規の遵守</li>
        </ol>
      </div>
    </div>
  );
};

export default EnvironmentalPolicy;
