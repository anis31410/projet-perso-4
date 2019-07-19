const express = require('express');
const passport = require('passport');
const db = require('./db');

const router = express.Router();

// GET 

router.get('/', (req, res) => {
  db.query('SELECT * FROM anime', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      })
    }
    return res.json(results);
  })
})

// route protégé avec token 

router.get('/classement', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.query('SELECT victory, name FROM anime ORDER BY victory DESC ', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: `No record`
      });
    }
    return res.json(results);
  })
})

router.get('/numberVictory/:id', (req, res) => {
  db.query('SELECT victory FROM anime WHERE id = ?', req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: `No record with id ${req.params.id}`
      });
    }
    return res.json(results[0]);
  })
});

// POST 

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.query('INSERT INTO anime SET ?', req.body, (err, status) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      })
    }
    return db.query('SELECT * FROM anime WHERE id = ?', status.insertId, (error, results) => {
      res.status(201).json(results);
    });
  });
});

router.put('/increment-victory/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.query('UPDATE anime SET ? WHERE anime.id =?', [req.body, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.json(req.body);
  });
});

module.exports = router;