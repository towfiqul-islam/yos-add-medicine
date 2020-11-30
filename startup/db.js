const mysql = require('mysql');

const connection = mysql.createConnection({
  // host: 'localhost',
  // port: '3307',
  // user: 'root',
  // password: 'root',
  // database: 'yos_db',
  host: 'aqx5w9yc5brambgl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'js1waekug7f7om05',
  password: 'hd5chcblm23s2taw',
  database: 'ckvksp61e4gyr6j3',
});

module.exports = connection;
