const express = require('express');
const cors = require('cors');

const add_med = require('../routes/addMed');
const get_med = require('../routes/getMed');
const update_med = require('../routes/updateMed');
const delete_med = require('../routes/deleteMed');
const login = require('../routes/login');
const guestOrders = require('../routes/guestOrders');
const userOrders = require('../routes/userOrders');
const products = require('../routes/products');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use('/', add_med);
  app.use('/', get_med);
  app.use('/update', update_med);
  app.use('/delete', delete_med);
  app.use('/login', login);
  app.use('/api/guest', guestOrders);
  app.use('/api/user', userOrders);
  app.use('/api/products', products);
};
