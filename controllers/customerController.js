const dayjs = require('dayjs')

const randomId = require('../utils');

// TODO: 顧客情報を登録する処理を実装する
const registerCustomer = async (db, req, res) => {
  const { name } = req.body;

  // 顧客をDBに保存
  const insertCustomer = db.prepare("INSERT INTO customers VALUES (?, ?, ?, ?, ?)");
  const customerId = randomId();
  insertCustomer.run([customerId, name, '🥉', dayjs().format('YYYY-MM-DD'), 0]);

  return res.json({ message: "Customer created!", data: { customerId } });
};

// TODO: 顧客情報を取得する処理を実装する
const getCustomerInfo = async (db, req, res) => {
  const customerId = req.params.id;
  console.log(`customerId: ${ customerId }`)

  // 返却値は下記の通り
  // 1. 現在のランク（こちらはすでに実装済み）
  // 2. ランク計算の開始日
  // 3. その開始日以降に使用された金額
  // 4. 次のランクに到達するために使用しなければならない金額
  // 5. これ以上使用しなかった場合、その顧客が来年ダウングレードされるランク
  //   i. その顧客が来年も現在のランクを維持するのに十分な金額を今年使った場合、これは無効であるべき
  // 6. ダウングレードの日付
  // 7. ダウングレードを回避するために顧客が今年使う必要のある金額

  // 2. ランク計算の開始日（前年の１月１日）を取得する
  const firstDayOfLastYear = dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
  const lastYearOrders = db.prepare("SELECT * FROM customers c INNER JOIN orders o WHERE c.customerId = ? AND c.customerId = o.customerId AND o.date >= ?");
  lastYearOrders.all([customerId, firstDayOfLastYear], (err, rows) => {
    console.log(`rows: ${ JSON.stringify(rows) }`)
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // 1. 現在のランク
    const currentRank = rows[0].currentRank;
    // ランク計算開始日以降に使用された金額
    const totalSpent = rows.reduce((sum, row) => sum + row.totalInCents, 0);
    const nextRank = currentRank === '🥉' ? '🥈' : '🥇';
    const nextRankThreshold = nextRank === '🥈' ? 100 : 500;
    // 4. 次のランクに到達するために使用しなければならない金額
    const requiredForNextRank = nextRankThreshold - totalSpent;
    // 5. これ以上使用しなかった場合、その顧客が来年ダウングレードされるランク
    const downgradeRank = currentRank === '🥇' ? '🥈' : '🥉';
    // 6. ダウングレードの日付
    const downgradeDate = dayjs().endOf('year').format('YYYY-MM-DD');
    // ダウングレード判定の閾値
    const downgradeThreshold = currentRank === '🥉' ? 0 : downgradeRank === '🥇' ? 500 : 100;
    // 7. ダウングレードを回避するために顧客が今年使う必要のある金額
    const downgradeThresholdDiff = currentRank === '🥉' ? 0 : downgradeThreshold - totalSpent;

    console.table([{
      firstDayOfLastYear: firstDayOfLastYear,
      currentRank: currentRank,
      totalSpent: totalSpent,
      nextRank: nextRank,
      nextRankThreshold: nextRankThreshold,
      nextRankThresholdDiff: requiredForNextRank,
      downgradeRank: downgradeRank,
      downgradeDate: downgradeDate,
      downgradeThreshold: downgradeThreshold,
      downgradeThresholdDiff: downgradeThresholdDiff,
    }])

    res.json({
      name: rows[0].name,
      currentRank,
      firstDayOfLastYear,
      totalSpent,
      requiredForNextRank,
      downgradeRank,
      downgradeDate,
      downgradeThresholdDiff,
    });
  });
};

module.exports = {
  getCustomerInfo,
  registerCustomer,
};
