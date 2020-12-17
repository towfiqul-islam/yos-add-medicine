const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getOrders() {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM guest_orders ORDER BY id DESC';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getSingleOrder(id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM guest_orders WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results[0]);
    });
  });
}

function updateOrder(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE guest_orders SET ? WHERE id=${id}`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

router.put('/update_order/:id', async (req, res) => {
  if (req.body.delivery_status === 'completed') {
    req.body.delivered_at = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    // calculate total amount with discount
    let total_amount = req.body.total_amount;
    let disc_amount = req.body.amount_after_discount;
    let disc = 3;

    let discAmount = (total_amount / 100) * disc;
    disc_amount = total_amount - discAmount;

    req.body.amount_after_discount = disc_amount;
  }
  const row = await updateOrder(req.params.id, req.body);
  res.json(row);
});

router.get('/get_single_order/:id', async (req, res) => {
  const order = await getSingleOrder(req.params.id);
  res.json({order});
});

router.get('/get_orders', async (req, res) => {
  const orders = await getOrders();
  res.json({
    orders,
  });
});

module.exports = router;
