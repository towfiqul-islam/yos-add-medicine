const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function updateMed(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE medicines SET ? WHERE medicine_id=${id}`;
    connection.query(sql, fields, (err, results) => {
      resolve(results.affectedRows);
    });
  });
}

router.put('/:id', async (req, res) => {
  try {
    req.body.unit_price = req.body.packet_price / req.body.size_of_packet;
    const affected_rows = await updateMed(req.params.id, req.body);
    res.json({affectedRows: affected_rows});
  } catch (err) {
    console.error('OOPS!!', err);
  }
});

module.exports = router;
