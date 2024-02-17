// FeaturedGamesModel.js
const connection = require("../database/index");

module.exports = {
    getAll: function(callback) {
        connection.query("SELECT * FROM featured_games", callback);
    },

    getById: function(id, callback) {
        connection.query("SELECT * FROM featured_games WHERE id=?", [id], callback);
    },

    create: function(gameData, callback) {
        connection.query("INSERT INTO featured_games SET ?", gameData, callback);
    },

    update: function(id, gameData, callback) {
        connection.query("UPDATE featured_games SET ? WHERE id=?", [gameData, id], callback);
    },

    delete: function(id, callback) {
        connection.query("DELETE FROM featured_games WHERE id=?", [id], callback);
    }
};
            