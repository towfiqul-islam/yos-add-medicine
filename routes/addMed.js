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
      resolve(results.insertId);
    });
  });
}

router.post('/', async (req, res) => {
  // const data = JSON.stringify(req.body);

  // const parseData = JSON.parse(data);
  // console.log(parseData);

  const id = await addMed(req.body);
  res.json({id: id});
  // console.log(req.body);
  // const data = await getMeds();
  // res.json({data: data});
});

module.exports = router;
