// LatestNewsModel.js
const connection = require("../database/index");

module.exports = {
    getAll: function(callback) {
        connection.query("SELECT * FROM latest_news", callback);
    },

    getById: function(id, callback) {
        connection.query("SELECT * FROM latest_news WHERE id=?", [id], callback);
    },

    create: function(newsData, callback) {
        connection.query("INSERT INTO latest_news SET ?", newsData, callback);
    },

    update: function(id, newsData, callback) {
        connection.query("UPDATE latest_news SET ? WHERE id=?", [newsData, id], callback);
    },

    delete: function(id, callback) {
        connection.query("DELETE FROM latest_news WHERE id=?", [id], callback);
    }
};