// TrendingDiscussionsController.js
const TrendingDiscussionsModel = require("../Models/TrendingDiscussionModel");

module.exports = {
    getAllTrendingDiscussions: function(req, res) {
        TrendingDiscussionsModel.getAll(function(err, trendingDiscussions) {
            if (err) {
                console.error("Error retrieving trending discussions:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json(trendingDiscussions);
            }
        });
    },

    getTrendingDiscussionById: function(req, res) {
        const discussionId = req.params.id;
        TrendingDiscussionsModel.getById(discussionId, function(err, discussion) {
            if (err) {
                console.error("Error retrieving discussion:", err);
                res.status(500).json({ error: "Internal server error" });
            } else if (!discussion) {
                res.status(404).json({ error: "Discussion not found" });
            } else {
                res.json(discussion);
            }
        });
    },

    createTrendingDiscussion: function(req, res) {
        const discussionData = req.body;
        TrendingDiscussionsModel.create(discussionData, function(err, result) {
            if (err) {
                console.error("Error creating discussion:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({ message: "Discussion created successfully", id: result.insertId });
            }
        });
    },

    updateTrendingDiscussion: function(req, res) {
        const discussionId = req.params.id;
        const discussionData = req.body;
        TrendingDiscussionsModel.update(discussionId, discussionData, function(err) {
            if (err) {
                console.error("Error updating discussion:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Discussion updated successfully" });
            }
        });
    },

    deleteTrendingDiscussion: function(req, res) {
        const discussionId = req.params.id;
        TrendingDiscussionsModel.delete(discussionId, function(err) {
            if (err) {
                console.error("Error deleting discussion:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Discussion deleted successfully" });
            }
        });
    }
};