const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'recruit-direct-secret-key'; // 本番環境では環境変数から読み込むこと

app.use(cors());
app.use(express.json());

// データベースの初期化（ファイルベース）
const db = new sqlite3.Database('./recruit_direct.db');

db.serialize(() => {
  // 企業テーブル
  db.run(`CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    billing_type TEXT DEFAULT 'credit'
  )`);

  // ユーザーテーブル
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'designer',
    FOREIGN KEY(company_id) REFERENCES companies(id)
  )`);

  // 商品テーブル
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    base_name TEXT NOT NULL,
    base_price INTEGER NOT NULL,
    description TEXT
  )`);

  // 仕様テーブル
  db.run(`CREATE TABLE IF NOT EXISTS product_specs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    name TEXT,
    value TEXT,
    price_modifier INTEGER,
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);

  // 注文テーブル
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    company_id INTEGER,
    total_price INTEGER,
    status TEXT DEFAULT 'pending_approval',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(company_id) REFERENCES companies(id)
  )`);

  // 注文明細テーブル
  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    specs_json TEXT,
    quantity INTEGER,
    unit_price INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);

  // 初期データ投入（データがない場合のみ）
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare(`INSERT INTO products (category, base_name, base_price, description) VALUES (?, ?, ?, ?)`);
      stmt.run("roller", "スチールローラ CR-PHI30", 3500, "標準的なスチール製ローラ。耐荷重性に優れます。");
      stmt.run("roller", "ステンレスローラ CR-SUS40", 5800, "耐食性に優れたステンレス製。食品工場、クリーン環境に。");
      stmt.finalize();

      db.run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES 
        (1, 'diameter', 'φ30', 0), (1, 'diameter', 'φ50', 500),
        (1, 'material', 'ST', 0), (1, 'material', 'SUS', 1500)`);
      
      // テスト用企業とユーザー
      db.run(`INSERT INTO companies (name, billing_type) VALUES ('株式会社ビルディクト', 'invoice')`);
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync('password123', salt);
      db.run(`INSERT INTO users (company_id, email, password_hash, role) VALUES 
        (1, 'admin@example.com', '${pass}', 'admin'),
        (1, 'approver@example.com', '${pass}', 'approver'),
        (1, 'user@example.com', '${pass}', 'orderer')`);
    }
  });
});

// 認証ミドルウェア
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API エンドポイント ---

// ログイン
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT u.*, c.name as company_name FROM users u JOIN companies c ON u.company_id = c.id WHERE u.email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'メールアドレスまたはパスワードが正しくありません' });
    }
    const token = jwt.sign({ id: user.id, company_id: user.company_id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, company_name: user.company_name } });
  });
});

// 商品一覧
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 商品詳細
app.get('/api/products/:id', (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, product) => {
    if (err || !product) return res.status(404).json({ error: 'Product not found' });
    db.all("SELECT * FROM product_specs WHERE product_id = ?", [req.params.id], (err, specs) => {
      res.json({ ...product, specs });
    });
  });
});

// 注文登録
app.post('/api/orders', authenticateToken, (req, res) => {
  const { items, totalPrice } = req.body;
  const status = req.user.role === 'approver' || req.user.role === 'admin' ? 'approved' : 'pending_approval';

  db.run(`INSERT INTO orders (user_id, company_id, total_price, status) VALUES (?, ?, ?, ?)`,
    [req.user.id, req.user.company_id, totalPrice, status],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const orderId = this.lastID;
      const stmt = db.prepare(`INSERT INTO order_items (order_id, product_id, specs_json, quantity, unit_price) VALUES (?, ?, ?, ?, ?)`);
      items.forEach(item => {
        stmt.run(orderId, item.id, JSON.stringify(item.specs), item.quantity, item.price);
      });
      stmt.finalize();
      res.json({ orderId, status });
    }
  );
});

// 注文履歴
app.get('/api/orders', authenticateToken, (req, res) => {
  db.all("SELECT * FROM orders WHERE company_id = ? ORDER BY created_at DESC", [req.user.company_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 注文承認
app.patch('/api/orders/:id/approve', authenticateToken, (req, res) => {
  if (req.user.role !== 'approver' && req.user.role !== 'admin') {
    return res.status(403).json({ error: '権限がありません' });
  }
  db.run("UPDATE orders SET status = 'approved' WHERE id = ? AND company_id = ?", [req.params.id, req.user.company_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
