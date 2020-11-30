const express = require('express');
const cors = require('cors');

const add_med = require('../routes/addMed');
const get_med = require('../routes/getMed');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use('/', add_med);
  app.use('/', get_med);
};
