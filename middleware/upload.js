const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const path = require('path');
cloudinary.config({
  cloud_name: 'yos',
  api_key: '138886735655922',
  api_secret: 'k5tkhhVxWtkpoEVDO9o2m6jT9hY',
});
module.exports = async function (req, res, next) {
  try {
    if (!req.file) {
      next();
      return;
    }

    console.log(req.file);

    // const filePath = path.dirname(req.file);
    // console.log(filePath);

    // cloudinary.uploader.upload(req.file, function (error, result) {
    //   console.log(result);
    // });
  } catch (err) {
    console.error('Image upload failed', err);
  }
};
