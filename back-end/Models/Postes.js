const connection = require('../database/index.js')


const getAll = (callback) => {
    const query = 'SELECT * FROM postes'
    connection.query(query, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

const getOne = (id, callback) => {
    const query = 'SELECT * FROM postes WHERE id=?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
const add = (newsData, callback) => {
    const { title, description, bigdescription, user, image } = newsData
    const query = 'INSERT INTO postes SET ?'
    connection.query(query, newsData, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}
const Delete = (id, callback) => {
    const query = 'DELETE FROM postes WHERE id=?'
    connection.query(query, id, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}
const update = (id, data, callback) => {
    const { title, description, bigdescription, user, image } = data
    const query = 'UPDATE  postes SET  title=?, description=? , bigdescription=?, user=?, image=?  WHERE id= ? '
    connection.query(query, [title, description, bigdescription, user, image, id], (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}
const searchByTitle = (searchTerm, callback) => {
    const query = 'SELECT * FROM postes WHERE title LIKE ?';
    const searchValue = `%${searchTerm}%`; // To search for titles containing the searchTerm
    connection.query(query, [searchValue], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = {
    getAll,
    getOne,
    add,
    Delete,
    update,
    searchByTitle
}