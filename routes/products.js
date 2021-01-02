const express = require('express');
const connection = require('../startup/db');

const router = express.Router();

function addProduct(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO products SET ?`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.insertId);
    });
  });
}
function getProducts() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM products`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}
function getSingleProduct(id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM products WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results[0]);
    });
  });
}
function updateProduct(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE products SET ? WHERE id=${id}`;
    connection.query(sql, fields, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}
function deleteProduct(id) {
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM products WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

function searchProductByName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM products WHERE product_name LIKE '%${name}%'`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getCompanyName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT DISTINCT company_name FROM products WHERE company_name LIKE '%${name}%'`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

router.get('/get_company_name/:name', async (req, res) => {
  const companies = await getCompanyName(req.params.name);
  res.json({companies});
});

router.get('/search_by_name/:name', async (req, res) => {
  const products = await searchProductByName(req.params.name);
  res.json({products});
});

router.post('/add', async (req, res) => {
  const id = await addProduct(req.body);
  res.json({id});
});

router.get('/get_all', async (req, res) => {
  const products = await getProducts();
  res.json({products});
});

router.get('/get_single/:id', async (req, res) => {
  const single_product = await getSingleProduct(req.params.id);
  res.json({single_product});
});

router.put('/update/:id', async (req, res) => {
  const row = await updateProduct(req.params.id, req.body);
  res.json({row});
});

router.delete('/delete/:id', async (req, res) => {
  const row = await deleteProduct(req.params.id);
  res.json({row});
});

module.exports = router;
