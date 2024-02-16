const connection = require('../database/index')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  
  
//   const addUser = async (user) => {
//     const { firstName, lastName, email, birth, password } = user;
//     await connection.execute(
//       'INSERT INTO user (firstName, lastName, email, birth, password) VALUES (?, ?, ?, ?, ?)',
//       [firstName, lastName, email, birth, password]
//     );
//   };

const login = async (email, password, callback) => {
    const query = 'SELECT * FROM user WHERE email = ?';  
    connection.query(query, [email], async (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        console.log('User found:', result);
  
        if (result.length === 0) {
          console.log('User not found');
          callback('User not found', null);
        } else {
          const storedHashedPassword = result[0].password;
          console.log('Stored hashed password:', storedHashedPassword);
  
          const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
          const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword)
          if (passwordMatch) {
            console.log('Password matched');
            callback(null, result[0]);
          } else {
            console.log('Incorrect password');
            callback('Incorrect password', null);
          }
        }
      }
    });
  };
  
  
  const register = async (user, callback) => {
    try {
        const { firstName, lastName, email, birth, password } = user;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Attempting to register user:", user);

        const connectionPromise = require('../database/index'); // Import the promise-based connection

        await connectionPromise.promise().query(
            'INSERT INTO `user` set firstName=?,lastName=?, email=?, birth=?, password=?',
            [firstName, lastName, email, birth,password],(err)=>{
                if(err){throw err;}
                else {console.log("User registered successfully");
        callback(null, 'Registration successful');}
            }
        );

        
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
};





  module.exports = { getUser,getAll,login , register  };
