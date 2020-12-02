const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'admin') {
      res.header('token', 'success').json({msg: 'login successful'});
    }
  } catch (err) {
    res.status(401).send('Invalid username or password');
    console.error('Something went wrong', err);
  }
});

module.exports = router;
