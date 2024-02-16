// TrendingDiscussionsRoutes.js
const express = require("express");
const router = express.Router();
const TrendingDiscussionsController = require("../Controllers/TrendingDiscussionController");

router.get("/getAll", TrendingDiscussionsController.getAllTrendingDiscussions);
router.get("/:id", TrendingDiscussionsController.getTrendingDiscussionById);
router.post("/add", TrendingDiscussionsController.createTrendingDiscussion);
router.put("/:id", TrendingDiscussionsController.updateTrendingDiscussion);
router.delete("/:id", TrendingDiscussionsController.deleteTrendingDiscussion);

module.exports = router;