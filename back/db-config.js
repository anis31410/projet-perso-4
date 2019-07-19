module.exports = {
  // host: 'localhost',
  // user: 'root',
  // password: 'password',
  // database: 'manga'
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};