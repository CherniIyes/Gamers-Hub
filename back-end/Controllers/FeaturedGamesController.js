// FeaturedGamesController.js
const FeaturedGamesModel = require("../Models/FeaturedGamesModel");

module.exports = {
    getAllFeaturedGames: function(req, res) {
        FeaturedGamesModel.getAll(function(err, featuredGames) {
            if (err) {
                console.error("Error retrieving featured games:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json(featuredGames);
            }
        });
    },

    getFeaturedGameById: function(req, res) {
        const gameId = req.params.id;
        FeaturedGamesModel.getById(gameId, function(err, game) {
            if (err) {
                console.error("Error retrieving featured game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else if (!game) {
                res.status(404).json({ error: "Featured game not found" });
            } else {
                res.json(game);
            }
        });
    },

    createFeaturedGame: function(req, res) {
        const gameData = req.body;
        FeaturedGamesModel.create(gameData, function(err, result) {
            if (err) {
                console.error("Error creating featured game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({ message: "Featured game created successfully", id: result.insertId });
            }
        });
    },

    updateFeaturedGame: function(req, res) {
        const gameId = req.params.id;
        const gameData = req.body;
        FeaturedGamesModel.update(gameId, gameData, function(err) {
            if (err) {
                console.error("Error updating featured game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Featured game updated successfully" });
            }
        });
    },

    deleteFeaturedGame: function(req, res) {
        const gameId = req.params.id;
        FeaturedGamesModel.delete(gameId, function(err) {
            if (err) {
                console.error("Error deleting featured game:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Featured game deleted successfully" });
            }
        });
    }
};
