const mysql = require('mysql');
const util = require('util');
const config = require('./db-config');

const connection = mysql.createConnection(config);

connection.queryAsync = util.promisify(connection.query.bind(connection));
module.exports = connection;