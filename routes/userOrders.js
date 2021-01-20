const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

// get user info
function getUserInfo(user_id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT first_name, last_name, phone, address FROM users WHERE id=${user_id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getOrders() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT user_orders.id as id,
      user_orders.prescription,
      user_orders.delivery_status,
      user_orders.payment_status,
      user_orders.total_amount,
      user_orders.amount_after_discount,
      users.first_name,
      users.last_name,
      users.phone,
      users.address FROM user_orders INNER JOIN users ON user_orders.user_id = users.id ORDER BY user_orders.id DESC`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getSingleOrder(id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM user_orders INNER JOIN users ON user_orders.user_id = users.id WHERE user_orders.id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results[0]);
    });
  });
}

function updateOrder(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE user_orders SET ? WHERE id=${id}`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function getOrderItems(user_order_id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM user_order_items WHERE user_order_id=${user_order_id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function updateOrderItems(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE user_order_items SET ? WHERE id=${id}`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function deleteOrderItem(id) {
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM user_order_items WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function addOrderItem(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO user_order_items SET ?`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.insertId);
    });
  });
}

function checkNumberOfOrders(user_id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT COUNT(user_id) AS ordered FROM user_orders WHERE user_id=${user_id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
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

// router.get('/get_number_of_orders/:user_id', async (req, res) => {
//   const ordered = await checkNumberOfOrders(req.body.user_id);
//   res.json({ordered})
// })

function updateYosWallet(user_id) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE users SET yos_wallet=100 WHERE id=${user_id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function updateTotalPurchase(user_id, total) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE users SET total_purchase=${total} WHERE id=${user_id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function getTotalPurchase(user_id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT SUM(amount_after_discount) AS total_purchase FROM user_orders WHERE user_id=${user_id} AND payment_status='paid';`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

router.put('/update_order/:id', async (req, res) => {
  try {
    if (
      req.body.delivery_status === 'completed' &&
      req.body.total_amount !== 0
    ) {
      // check number of orders by the user
      const number_of_orders = await checkNumberOfOrders(req.body.user_id);

      // add bonus if number of order is only 1
      if (number_of_orders[0].ordered === 1) {
        await updateYosWallet(req.body.user_id);
      }
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
      // Update total purchase
      const total_purchase = await getTotalPurchase(req.body.user_id);
      await updateTotalPurchase(
        req.body.user_id,
        total_purchase[0].total_purchase,
      );
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

router.get('/get_order_items/:user_order_id', async (req, res) => {
  const orderItems = await getOrderItems(req.params.user_order_id);
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

router.get('/get_user_info/:user_id', async (req, res) => {
  const userInfo = await getUserInfo(req.params.user_id);
  res.json({
    userInfo,
  });
});

module.exports = router;
