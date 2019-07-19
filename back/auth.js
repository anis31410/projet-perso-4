const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('./db');

const saltRounds = 10;
const router = express.Router();

router.get('/', (req, res) => db.query('SELECT * FROM user', (err, results) => {
  res.send(results);
}))

router.post('/signup', (req, res) => {
  const { email, password, fullname } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'require field(s) missing' });
  }
  bcrypt.hash(password, saltRounds)
    .then(hash => {
      db.query('INSERT INTO user SET ?', [{ email, password: hash, fullname }], (err, status) => {
        return res.status(201).json({
          status: 'user created'
        });
      })
    })
})

router.post('/signin', passport.authenticate('local', { session: false }), (req, res) => {
  jwt.sign(req.user, process.env.SECRET_KEY, (err, token) => {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    }
    console.log(req.user);
    return res.send(
      token
    )
  });

})

module.exports = router;
