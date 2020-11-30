const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getMeds() {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM medicines';
    connection.query(sql, (err, results) => {
      resolve(results[0]);
    });
  });
}
// router.get('/', async (req, res) => {
//   const data = await getMeds();
//   res.json({msg: 'Success!', data: {data}});
// });

module.exports = router;
