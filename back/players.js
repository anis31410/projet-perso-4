const express = require('express');
const passport = require('passport');
const db = require('./db');

const router = express.Router();

// GET 

router.get('/', (req, res) => {
  db.query('SELECT * FROM players', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.json(results);
  });
});

router.get('/:id', (req, res) => {
  // console.log(req.params)
  db.query('SELECT * FROM players WHERE id = ?', req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: `No record with id ${req.params.id}`
      })
    }
    return res.json(results[0])
  })
})

// UPDATE

router.put('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.query('UPDATE players SET ? WHERE id = ?', [req.body, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.json(req.body);
  });
});

// POST 

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.query('INSERT INTO players SET ? ', req.body, (err, status) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return db.query('SELECT * FROM players', status.insertId, (error, results) => {
      res.status(201).json(results);
    })
  })
})

// DELETE 

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM players WHERE id = ?', req.params.id, passport.authenticate('jwt', { session: false }), (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.json(results);
  })
})

module.exports = router;


