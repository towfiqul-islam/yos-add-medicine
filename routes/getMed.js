const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getMeds() {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM medicines';
    connection.query(sql, (err, results) => {
      resolve(results);
    });
  });
}
function getSingleMed(id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE medicine_id=${id}`;
    connection.query(sql, (err, results) => {
      resolve(results[0]);
    });
  });
}
function getMedByTradeName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE trade_name LIKE '%${name}%'`;
    connection.query(sql, (err, results) => {
      resolve(results);
    });
  });
}
function getMedByGenericName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT DISTINCT generic_name from medicines WHERE generic_name LIKE '%${name}%'`;
    connection.query(sql, (err, results) => {
      resolve(results);
    });
  });
}
function getMedByCompanyName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT DISTINCT company_name from medicines WHERE company_name LIKE '%${name}%'`;
    connection.query(sql, (err, results) => {
      resolve(results);
    });
  });
}
router.get('/get_all', async (req, res) => {
  const data = await getMeds();
  res.send(data);
});

router.get('/search/:trade_name', async (req, res) => {
  // const trade_name = new RegExp(`.*${req.params.trade_name}.*`, 'i');
  const data = await getMedByTradeName(req.params.trade_name);
  res.json({data});
});

router.get('/search_by_generic_name/:name', async (req, res) => {
  const data = await getMedByGenericName(req.params.name);
  res.json({data});
});

router.get('/search_by_company_name/:name', async (req, res) => {
  const data = await getMedByCompanyName(req.params.name);
  res.json({data});
});

router.get('/get_single/:id', async (req, res) => {
  const data = await getSingleMed(req.params.id);
  res.send(data);
});

module.exports = router;
