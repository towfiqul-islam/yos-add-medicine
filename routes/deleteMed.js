const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function deleteMedicine(id) {
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM medicines WHERE medicine_id=${id}`;
    connection.query(sql, (err, results) => {
      resolve(results.affectedRows);
    });
  });
}

router.delete('/:id', async (req, res) => {
  const affected_rows = await deleteMedicine(req.params.id);
  res.json({affected_rows});
});

module.exports = router;
