const connection = require('../database/index')


const getAll = (callback) => {
    const query = 'SELECT * FROM user ';  
    connection.query(query, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};


const getUser = (emailTerm, callback) => {
    const query = 'SELECT * FROM user WHERE email = ?';  
    connection.query(query, [emailTerm], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

  
  
  const addUser = async (user) => {
    const { firstName, lastName, email, birth, password } = user;
    await connection.execute(
      'INSERT INTO user (firstName, lastName, email, birth, password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, birth, password]
    );
  };
  
  module.exports = { getUser,getAll, addUser };
