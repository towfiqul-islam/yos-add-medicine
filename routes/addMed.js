const express = require('express');
// const resizePhoto = require('../middleware/resizePhoto');
const {upload} = require('../middleware/uploadPhoto');
const uploadToCloudinary = require('../middleware/upload');
const connection = require('../startup/db');
const router = express.Router();

function addMed(fields) {
  return new Promise(function (resolve, reject) {
    const sql = 'INSERT INTO medicines SET ?';
    connection.query(sql, fields, (err, results) => {
      if (err) {
        console.error('sql error', err);
      }
      resolve(results.insertId);
    });
  });
}

router.post('/', async (req, res) => {
  try {
    // const data = JSON.stringify(req.body);

    // const parseData = JSON.parse(data);
    // console.log(parseData);

    req.body.unit_price = req.body.packet_price / req.body.size_of_packet;
    // console.log(req.body);

    const id = await addMed(req.body);
    res.json({id: id});
    // console.log(req.body);
    // const data = await getMeds();
    // res.json({data: data});
  } catch (err) {
    console.error('Something went wrong', err);
  }
});

module.exports = router;
