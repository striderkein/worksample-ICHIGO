// server.js
// where your node app starts

// init project
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const morgan = require('morgan');
const app = express();
const path = require('path')
const cron = require('node-cron');

const { getCustomerInfo, registerCustomer } = require('./controllers/customerController');
const { registerOrder, getOrders } = require('./controllers/orderController');
const { recalculateRanks } = require('./utils');

app.use(express.json());
app.use(morgan());

// DB初期設定
const db = new sqlite3.Database('./database.db');

// 簡便のため、name を customerId として扱う
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS orders (customerId TEXT, orderId TEXT, totalInCents INT, date TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS customers (name TEXT PRIMARY KEY, currentRank TEXT, lastCalculationDate TEXT, totalSpent INT)");
});

// 顧客を登録するエンドポイント
app.post('/customers', (req, res) => registerCustomer(db, req, res));

// 注文を完了するエンドポイント
app.post('/orders', (req, res) => registerOrder(db, req, res));

// 顧客情報を返すエンドポイント
app.get('/customers/:id', (req, res) => getCustomerInfo(db, req, res));

// 注文一覧を返すエンドポイント
app.get('/orders/:customerId', (req, res) => getOrders(db, req, res));

const perYear = '0 0 31 12 *';
// 毎年12月31日にランクを再計算する
cron.schedule(perYear, () => {
  console.log("re-calculate ranks...");
  recalculateRanks();
});

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
