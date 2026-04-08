const request = require('supertest');
const { createApp } = require('./app');

describe('RecruitDirect API Tests', () => {
  let app;
  let adminToken;
  let userToken;

  beforeAll(async () => {
    const created = await createApp(':memory:');
    app = created.app;

    // 認証トークンの取得
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });
    adminToken = adminRes.body.token;

    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password123' });
    userToken = userRes.body.token;
  });

  describe('1. 認証・権限管理 (REQ-1.4)', () => {
    it('1.1 正しい資格情報でログインできること', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@example.com', password: 'password123' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('admin');
    });

    it('1.2 誤ったパスワードでログイン失敗すること', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@example.com', password: 'wrongpassword' });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toContain('正しくありません');
    });

    it('1.3 orderer権限で承認APIを叩くと403になること', async () => {
      const res = await request(app)
        .patch('/api/orders/1/approve')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(403);
    });
  });

  describe('2. 商品・価格関連 (REQ-1.1, 1.2)', () => {
    it('2.1 商品一覧が取得できること', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('2.2 商品詳細と仕様が取得できること', async () => {
      const res = await request(app).get('/api/products/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('specs');
    });
  });

  describe('3. 注文フロー (REQ-1.5)', () => {
    it('3.1 発注担当者が注文申請できること', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [{ id: 1, specs: { diameter: 'φ30' }, quantity: 1, price: 3500 }],
          totalPrice: 3500
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('pending_approval');
    });

    it('3.2 管理者が注文すると即時承認されること', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          items: [{ id: 1, specs: { diameter: 'φ30' }, quantity: 1, price: 3500 }],
          totalPrice: 3500
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('approved');
    });

    it('3.3 承認者が注文を承認できること', async () => {
      // まず注文を作成
      const orderRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [{ id: 1, specs: { diameter: 'φ30' }, quantity: 1, price: 3500 }],
          totalPrice: 3500
        });
      const orderId = orderRes.body.orderId;

      // 承認
      const approveRes = await request(app)
        .patch(`/api/orders/${orderId}/approve`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(approveRes.statusCode).toBe(200);
    });
  });

  describe('5. 異常系 (DD-4.0)', () => {
    it('5.1 未認証で注文しようとすると401になること', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ items: [], totalPrice: 0 });
      expect(res.statusCode).toBe(401);
    });
  });
});
