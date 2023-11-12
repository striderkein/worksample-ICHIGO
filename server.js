// server.js
// where your node app starts

// init project
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const morgan = require('morgan');
const app = express();
const path = require('path')
const dayjs = require('dayjs')
// const fetch = require('node-fetch');

app.use(express.json());
app.use(morgan());

// DB初期設定
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS orders (customerId TEXT, orderId TEXT, totalInCents INT, date TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS customers (customerId TEXT PRIMARY KEY, name TEXT, currentRank TEXT, lastCalculationDate TEXT, totalSpent INT)");
});

// 顧客を登録するエンドポイント
app.post('/customers', (req, res) => {
  const { name } = req.body;

  // 顧客をDBに保存
  const insertCustomer = db.prepare("INSERT INTO customers VALUES (?, ?, ?, ?, ?)");
  const customerId = Math.random().toString(32).substring(2);
  insertCustomer.run([customerId, name, '🥉', dayjs().format('YYYY-MM-DD'), 0]);

  return res.json({ message: "Customer created!", data: { customerId } });
});

// 注文を完了するエンドポイント
app.post('/orders', (req, res) => {
  const { customerId, totalInCents } = req.body;

  // 注文をDBに保存
  const insertOrder = db.prepare("INSERT INTO orders VALUES (?, ?, ?, ?)");
  const orderId = Math.random().toString(32).substring(2);
  const date = dayjs().format('YYYY-MM-DD');
  insertOrder.run([customerId, orderId, totalInCents, date]);

  // 顧客のランクを再計算
  db.get("SELECT SUM(totalInCents) as totalSpent FROM orders WHERE customerId = ?", [customerId], (err, row) => {
    let newRank = '🥉';
    if (row.totalSpent >= 500) {
      newRank = '🥇';
    } else if (row.totalSpent >= 100) {
      newRank = '🥈';
    }
    db.run("UPDATE customers SET currentRank = ?, lastCalculationDate = ?, totalSpent = ? WHERE customerId = ?", [newRank, date, row.totalSpent, customerId]);
  });

  return res.json({ message: "Order completed!" });
});

// TODO: 毎年末にランクを再計算する cron ジョブ的なやつ
// // recalculateRanks.js
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./database.db');
//
// db.serialize(() => {
//   // ここでランクを再計算するロジックを書く
// });

// 顧客情報を返すエンドポイント
app.get('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  console.log(`customerId: ${ customerId }`)

  db.get("SELECT * FROM customers WHERE customerId = ?", [customerId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// 注文一覧を返すエンドポイント
app.get('/orders/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  db.all("SELECT * FROM orders WHERE customerId = ?", [customerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
