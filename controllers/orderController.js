const dayjs = require('dayjs')

const randomId = require('../utils');

const registerOrder = async (db, req, res) => {
  const { customerId, totalInCents } = req.body;

  // 注文をDBに保存
  const insertOrder = db.prepare("INSERT INTO orders VALUES (?, ?, ?, ?)");
  const orderId = randomId();
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
}

const getOrders = async (db, req, res) => {
  const customerId = req.params.customerId;

  db.all("SELECT * FROM orders WHERE customerId = ?", [customerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    return res.json(rows);
  });
}

module.exports = {
  registerOrder,
  getOrders,
}