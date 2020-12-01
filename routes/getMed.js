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
router.get('/get_all', async (req, res) => {
  const data = await getMeds();
  res.send(data);
});

module.exports = router;
