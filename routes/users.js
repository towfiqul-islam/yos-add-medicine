const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getAllUsers() {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

router.get('/get-all-users', async (req, res) => {
  const data = await getAllUsers();
  res.send(data);
});

module.exports = router;
