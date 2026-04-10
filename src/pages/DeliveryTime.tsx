import React from 'react';

const DeliveryTime: React.FC = () => {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>納期確認</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
            <th style={{ padding: '15px', textAlign: 'left' }}>商品カテゴリ</th>
            <th style={{ padding: '15px', textAlign: 'left' }}>標準納期</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '15px' }}>標準ローラ (スチール)</td>
            <td style={{ padding: '15px' }}>受注後 3〜5 営業日出荷</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '15px' }}>ステンレスローラ</td>
            <td style={{ padding: '15px' }}>受注後 5〜7 営業日出荷</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '15px' }}>特注仕様品</td>
            <td style={{ padding: '15px' }}>別途お見積り (通常 10営業日〜)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTime;
