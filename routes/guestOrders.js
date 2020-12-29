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

function getOrderItems(guest_order_id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM guest_order_items WHERE order_id=${guest_order_id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function updateOrderItems(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE guest_order_items SET ? WHERE id=${id}`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function deleteOrderItem(id) {
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM guest_order_items WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function addOrderItem(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO guest_order_items SET ?`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.insertId);
    });
  });
}

router.post('/add_order_item', async (req, res) => {
  req.body.price = req.body.quantity * req.body.price;
  const id = await addOrderItem(req.body);
  res.json({id});
});

router.delete('/delete_order_item/:id', async (req, res) => {
  const row = await deleteOrderItem(req.params.id);
  res.json({row});
});

router.put('/update_order_item/:id', async (req, res) => {
  req.body.price = req.body.quantity * req.body.price;
  const row = await updateOrderItems(req.params.id, req.body);
  res.json({row});
});

router.put('/update_order/:id', async (req, res) => {
  try {
    if (
      req.body.delivery_status === 'completed' &&
      req.body.total_amount !== 0
    ) {
      req.body.payment_status = 'paid';
      req.body.delivered_at = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      // calculate total amount with discount
      let total_amount = req.body.total_amount;
      let disc_amount = req.body.amount_after_discount;
      let disc = process.env.DISCOUNT;

      let discAmount = (total_amount / 100) * disc;
      disc_amount = total_amount - discAmount;

      req.body.discount_percentage = disc;

      req.body.amount_after_discount = disc_amount;
      const row = await updateOrder(req.params.id, req.body);
      res.json(row);
    } else if (req.body.delivery_status === 'cancelled') {
      req.body.payment_status = 'n/a';
      req.body.total_amount = 0;
      req.body.amount_after_discount = 0;
      const row = await updateOrder(req.params.id, req.body);
      res.json(row);
    } else {
      res.json({
        msg: 'Order cannot be updated',
      });
    }
  } catch (err) {
    res.status(400).send('Something went wrong!!!');
  }
});

router.get('/get_order_items/:guest_order_id', async (req, res) => {
  const orderItems = await getOrderItems(req.params.guest_order_id);
  res.json({orderItems});
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
