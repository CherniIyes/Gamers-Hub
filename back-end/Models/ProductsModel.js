// ProductModel.js
const connection = require("../database/index");

module.exports = {
    getAll: function(callback) {
        connection.query("SELECT * FROM product", callback);
    },

    getById: function(id, callback) {
        connection.query("SELECT * FROM product WHERE id=?", [id], callback);
    },

    create: function(productData, callback) {
        connection.query("INSERT INTO product SET ?", productData, callback);
    },

    update: function(id, productData, callback) {
        connection.query("UPDATE product SET ? WHERE id=?", [productData, id], callback);
    },

    delete: function(id, callback) {
        connection.query("DELETE FROM product WHERE id=?", [id], callback);
    }
};
