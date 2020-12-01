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
router.get('/get_all', async (req, res) => {
  const data = await getMeds();
  res.send(data);
});

router.get('/get_single/:id', async (req, res) => {
  const data = await getSingleMed(req.params.id);
  res.send(data);
});

module.exports = router;
