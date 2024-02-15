const mysql = require('mysql2');
const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gamershub'
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
