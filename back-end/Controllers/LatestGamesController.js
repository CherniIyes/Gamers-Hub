// LatestGamesController.js
const LatestGamesModel = require("../Models/LatestGamesModel");

module.exports = {
    getAllLatestGames: function(req, res) {
        LatestGamesModel.getAll(function(err, latestGames) {
            if (err) {
                console.error("Error retrieving latest games:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json(latestGames);
            }
        });
    },

    getLatestGameById: function(req, res) {
        const gameId = req.params.id;
        LatestGamesModel.getById(gameId, function(err, game) {
            if (err) {
                console.error("Error retrieving latest game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else if (!game) {
                res.status(404).json({ error: "Latest game not found" });
            } else {
                res.json(game);
            }
        });
    },

    createLatestGame: function(req, res) {
        const gameData = req.body;
        LatestGamesModel.create(gameData, function(err, result) {
            if (err) {
                console.error("Error creating latest game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({ message: "Latest game created successfully", id: result.insertId });
            }
        });
    },

    updateLatestGame: function(req, res) {
        const gameId = req.params.id;
        const gameData = req.body;
        LatestGamesModel.update(gameId, gameData, function(err) {
            if (err) {
                console.error("Error updating latest game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Latest game updated successfully" });
            }
        });
    },

    deleteLatestGame: function(req, res) {
        const gameId = req.params.id;
        LatestGamesModel.delete(gameId, function(err) {
            if (err) {
                console.error("Error deleting latest game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Latest game deleted successfully" });
            }
        });
    }
};

// TrendingDiscussionsController.js
// Similar structure as LatestGamesController but for trending discussions

// FeaturedGamesController.js
// Similar structure as LatestGamesController but for featured games
