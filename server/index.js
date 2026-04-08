const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const db = new sqlite3.Database(':memory:'); // テスト用インメモリDB

app.use(express.json());

// データベースの初期化
db.serialize(() => {
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    base_name TEXT NOT NULL,
    base_price INTEGER NOT NULL,
    description TEXT
  )`);

  const stmt = db.prepare(`INSERT INTO products (category, base_name, base_price, description) VALUES (?, ?, ?, ?)`);
  stmt.run("roller", "スチールローラ CR-PHI30", 3500, "標準的なスチール製ローラ。耐荷重性に優れます。");
  stmt.run("roller", "ステンレスローラ CR-SUS40", 5800, "耐食性に優れたステンレス製。食品工場、クリーン環境に。");
  stmt.run("belt", "高耐久PVCベルト PV-100", 12000, "一般搬送用PVCベルト。摩耗に強く、汎用性が高い。");
  stmt.run("bearing", "ピローブロック P-205", 2800, "確かな回転と長寿命を実現する標準ピローユニット。");
  stmt.finalize();

  db.run(`CREATE TABLE product_specs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    name TEXT,
    value TEXT,
    price_modifier INTEGER,
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);
  
  // 仕様データの投入 (例)
  const specStmt = db.prepare(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`);
  specStmt.run(1, "diameter", "φ30", 0);
  specStmt.run(1, "diameter", "φ50", 500);
  specStmt.run(1, "material", "ST", 0);
  specStmt.run(1, "material", "SUS", 1500);
  specStmt.finalize();
});

// API エンドポイント
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all("SELECT * FROM product_specs WHERE product_id = ?", [id], (err, specs) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...product, specs });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
