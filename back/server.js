const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('./env');

const teamRouter = require('./team');
const playersRouter = require('./players');
const authRouter = require('./auth');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (username, password, done) => {
    db.query('SELECT * FROM user WHERE email = ?', username, (err, users) => {
      if (err) { return done(err); }
      if (users.length === 0) { return done(null, false); }
      const user = users[0];
      bcrypt.compare(password, user.password).then(match => {
        if (!match) { return done(null, false); }
        // Pour ne pas renvoyer le password
        const { id, email, fullname } = user;
        return done(null, { id, email, fullname });
        // return done(null, user);
      });

    })
  }
))



const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
  done(null, jwtPayload);
}));


app.use('/api/players', playersRouter);
app.use('/api/team', teamRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT || 5000, err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server is listening on port ${process.env.PORT || 5000}`)
  }
})