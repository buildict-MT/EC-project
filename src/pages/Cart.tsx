import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, CartItem } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, FileText, ChevronRight, ShoppingBag, Send, CheckCircle } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, totalAmount, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart,
          totalPrice: totalAmount
        })
      });

      if (!response.ok) throw new Error('注文に失敗しました');

      setOrderSuccess(true);
      clearCart();
      setTimeout(() => navigate('/account'), 3000);
    } catch (err) {
      alert('注文処理中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    
    // 日本語フォントの読み込み (Noto Sans JP)
    // 軽量化のため、実際のプロジェクトではフォントファイルをローカルに保持することを推奨します
    const fontUrl = 'https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Regular.otf';
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    const japaneseFont = await pdfDoc.embedFont(fontBytes);
    const japaneseFontBold = await pdfDoc.embedFont(fontBytes); // 今回は同じフォントを使用

    const { width, height } = page.getSize();
    
    // ヘッダー
    page.drawText('見積書 / ESTIMATE', { x: 50, y: height - 50, size: 20, font: japaneseFontBold, color: rgb(0, 0.2, 0.4) });
    page.drawText(`発行日: ${new Date().toLocaleDateString()}`, { x: width - 150, y: height - 50, size: 10, font: japaneseFont });
    page.drawText('RecruitDirect オンラインストア', { x: width - 150, y: height - 65, size: 10, font: japaneseFont });

    // 宛名
    page.drawText(`御中: ${user?.company_name || 'お客様'}`, { x: 50, y: height - 100, size: 12, font: japaneseFontBold });
    page.drawLine({ start: { x: 50, y: height - 105 }, end: { x: 250, y: height - 105 }, thickness: 1 });

    // 合計金額
    page.drawText(`合計金額: ¥ ${totalAmount.toLocaleString()} (税込)`, { x: 50, y: height - 140, size: 14, font: japaneseFontBold });

    // テーブルヘッダー
    const tableTop = height - 180;
    page.drawRectangle({ x: 50, y: tableTop - 20, width: width - 100, height: 20, color: rgb(0.95, 0.95, 0.95) });
    page.drawText('商品名 / 仕様', { x: 60, y: tableTop - 15, size: 10, font: japaneseFontBold });
    page.drawText('数量', { x: 400, y: tableTop - 15, size: 10, font: japaneseFontBold });
    page.drawText('単価', { x: 500, y: tableTop - 15, size: 10, font: japaneseFontBold });

    // 明細
    let currentY = tableTop - 40;
    cart.forEach((item: CartItem) => {
      const specStr = Object.entries(item.specs).map(([k, v]) => `${v}`).join(' ');
      page.drawText(`${item.base_name}`, { x: 60, y: currentY, size: 9, font: japaneseFont });
      page.drawText(`(${specStr} L${item.length}mm)`, { x: 60, y: currentY - 10, size: 8, font: japaneseFont, color: rgb(0.4, 0.4, 0.4) });
      page.drawText(item.quantity.toString(), { x: 400, y: currentY, size: 9, font: japaneseFont });
      page.drawText(`¥ ${item.price.toLocaleString()}`, { x: 500, y: currentY, size: 9, font: japaneseFont });
      currentY -= 30;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Estimate_${new Date().getTime()}.pdf`;
    link.click();
  };

  if (orderSuccess) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <CheckCircle size={64} color="#10b981" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: 'var(--primary-color)' }}>注文・申請が完了しました。</h2>
        <p style={{ marginTop: '10px', color: '#666' }}>マイページよりステータスを確認いただけます。自動的にマイページへ移動します...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <ShoppingBag size={64} color="#ccc" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: 'var(--text-light)' }}>カートに商品が入っていません。</h2>
        <a href="/products" className="btn btn-primary" style={{ marginTop: '30px' }}>商品を探す</a>
      </div>
    );
  }

  return (
    <div className="container" style={{ margin: '60px auto' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '40px' }}>ショッピングカート</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        {/* 左側: 商品リスト */}
        <div>
          {cart.map((item: CartItem) => (
            <div key={item.cartId} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
              <div style={{ width: '100px', height: '100px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#ccc' }}>
                IMAGE
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--primary-color)' }}>{item.base_name}</h3>
                  <button onClick={() => removeFromCart(item.cartId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4444' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  仕様: {Object.entries(item.specs).map(([k, v]) => `${v}`).join(' / ')} / L{item.length}mm
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '15px' }}>
                  <span style={{ fontSize: '14px' }}>数量: {item.quantity}</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>¥{item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
          
          <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px' }}>
            カートを空にする
          </button>
        </div>

        {/* 右側: 合計・アクション */}
        <div>
          <div style={{ backgroundColor: 'var(--secondary-color)', padding: '30px', borderRadius: '4px' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '20px' }}>注文内容</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>商品小計</span>
              <span>¥{totalAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>送料</span>
              <span>見積りにて算出</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--primary-color)', paddingTop: '15px', marginTop: '15px', fontWeight: 'bold', fontSize: '20px' }}>
              <span>合計</span>
              <span style={{ color: 'var(--primary-color)' }}>¥{totalAmount.toLocaleString()}</span>
            </div>

            <button 
              className="btn btn-accent" 
              style={{ width: '100%', marginTop: '30px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? '処理中...' : user?.role === 'orderer' ? <><Send size={18} /> 承認を申請する</> : <><ChevronRight size={18} /> 注文を確定する</>}
            </button>
            
            <button 
              onClick={generatePDF}
              className="btn" 
              style={{ width: '100%', marginTop: '15px', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <FileText size={18} /> 見積書を発行 (PDF)
            </button>
          </div>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '20px', lineHeight: '1.4' }}>
            ※B2Bアカウントの場合、発注担当者は承認者の確認が必要です。<br />
            ※見積書は正式な発注書としてご利用いただけます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
