const jimp = require('jimp');
const uuid = require('uuid');

module.exports = async function (req, res, next) {
  if (!req.file) {
    next();
    return;
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(100, jimp.AUTO);
  await photo.write(`./uploads/${req.body.image}`);
  next();
};
