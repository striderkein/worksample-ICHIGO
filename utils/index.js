function recalculateRanks(db) {
  db.each("SELECT customerId, SUM(totalInCents) as totalSpent FROM orders WHERE date >= strftime('%Y-01-01') AND date < strftime('%Y-12-31') GROUP BY customerId", (err, row) => {
    let newRank = '🥉';
    if (row.totalSpent >= 500) {
      newRank = '🥇';
    } else if (row.totalSpent >= 100) {
      newRank = '🥈';
    }
    db.run("UPDATE customers SET currentRank = ? WHERE customerId = ?", [newRank, row.customerId]);
  });
}

module.exports = {
  recalculateRanks,
};
