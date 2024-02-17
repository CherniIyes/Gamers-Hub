// LatestNewsController.js
const LatestNewsModel = require("../Models/LatestNewsModel");

module.exports = {
    getAllLatestNews: function(req, res) {
        LatestNewsModel.getAll(function(err, latestNews) {
            if (err) {
                console.error("Error retrieving latest news:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json(latestNews);
            }
        });
    },

    getLatestNewsById: function(req, res) {
        const newsId = req.params.id;
        LatestNewsModel.getById(newsId, function(err, news) {
            if (err) {
                console.error("Error retrieving news:", err);
                res.status(500).json({ error: "Internal server error" });
            } else if (!news) {
                res.status(404).json({ error: "News not found" });
            } else {
                res.json(news);
            }
        });
    },

    createLatestNews: function(req, res) {
        const newsData = req.body;
        LatestNewsModel.create(newsData, function(err, result) {
            if (err) {
                console.error("Error creating news:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({ message: "News created successfully", id: result.insertId });
            }
        });
    },

    updateLatestNews: function(req, res) {
        const newsId = req.params.id;
        const newsData = req.body;
        LatestNewsModel.update(newsId, newsData, function(err) {
            if (err) {
                console.error("Error updating news:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "News updated successfully" });
            }
        });
    },

    deleteLatestNews: function(req, res) {
        const newsId = req.params.id;
        LatestNewsModel.delete(newsId, function(err) {
            if (err) {
                console.error("Error deleting news:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "News deleted successfully" });
            }
        });
    }
};