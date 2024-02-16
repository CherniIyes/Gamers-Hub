// LatestGamesModel.js
const connection = require("../database/index");

module.exports = {
    getAll: function(callback) {
        connection.query("SELECT * FROM latest_games", callback);
    },

    getById: function(id, callback) {
        connection.query("SELECT * FROM latest_games WHERE id=?", [id], callback);
    },

    create: function(gameData, callback) {
        connection.query("INSERT INTO latest_games SET ?", gameData, callback);
    },

    update: function(id, gameData, callback) {
        connection.query("UPDATE latest_games SET ? WHERE id=?", [gameData, id], callback);
    },

    delete: function(id, callback) {
        connection.query("DELETE FROM latest_games WHERE id=?", [id], callback);
    }
};

// TrendingDiscussionsModel.js
// Similar structure as LatestGamesModel but for trending discussions

// FeaturedGamesModel.js
// Similar structure as LatestGamesModel but for featured games
