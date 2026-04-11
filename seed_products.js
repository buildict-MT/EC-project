const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./recruit_direct.db');

const categories = ['roller', 'belt', 'bearing', 'frame', 'motor', 'sensor', 'gear', 'coupling'];
const prefixes = ['CR', 'BT', 'BR', 'AL', 'MT', 'SN', 'GR', 'CP'];
const materials = ['スチール', 'ステンレス', 'アルミ', '樹脂', '強化プラスチック'];

async function seed() {
  console.log('Inserting 1000 products...');

  const run = (query, params) => new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });

  try {
    for (let i = 1; i <= 1000; i++) {
      const catIndex = Math.floor(Math.random() * categories.length);
      const category = categories[catIndex];
      const prefix = prefixes[catIndex];
      const material = materials[Math.floor(Math.random() * materials.length)];
      
      const baseName = `${material}${category.toUpperCase()} ${prefix}-${100 + i}`;
      const basePrice = 1000 + Math.floor(Math.random() * 50000);
      const description = `高品質な${material}製の${category}です。型番 ${prefix}-${100 + i}。`;

      const productId = await run(
        `INSERT INTO products (category, base_name, base_price, description) VALUES (?, ?, ?, ?)`,
        [category, baseName, basePrice, description]
      );

      if (category === 'roller') {
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'diameter', 'φ30', 0]);
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'diameter', 'φ50', 500]);
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'material', 'ST', 0]);
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'material', 'SUS', 1500]);
      } else {
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'size', 'S', 0]);
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'size', 'M', 1000]);
        await run(`INSERT INTO product_specs (product_id, name, value, price_modifier) VALUES (?, ?, ?, ?)`, [productId, 'size', 'L', 2500]);
      }

      if (i % 100 === 0) console.log(`${i} products processed...`);
    }
    console.log('Finished seeding 1000 products.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    db.close();
  }
}

seed();
