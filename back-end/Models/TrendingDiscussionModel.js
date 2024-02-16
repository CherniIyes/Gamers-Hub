
// TrendingDiscussionsModel.js
const connection = require("../database/index");

module.exports = {
    getAll: function(callback) {
        connection.query("SELECT * FROM trending_discussions", callback);
    },

    getById: function(id, callback) {
        connection.query("SELECT * FROM trending_discussions WHERE id=?", [id], callback);
    },

    create: function(discussionData, callback) {
        connection.query("INSERT INTO trending_discussions SET ?", discussionData, callback);
    },

    update: function(id, discussionData, callback) {
        connection.query("UPDATE trending_discussions SET ? WHERE id=?", [discussionData, id], callback);
    },

    delete: function(id, callback) {
        connection.query("DELETE FROM trending_discussions WHERE id=?", [id], callback);
    }
};