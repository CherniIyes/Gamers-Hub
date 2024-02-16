// LatestGamesRoutes.js
const express = require("express");
const router = express.Router();
const LatestGamesController = require("../Controllers/LatestGamesController");

router.get("/getAll", LatestGamesController.getAllLatestGames);
router.get("/:id", LatestGamesController.getLatestGameById);
router.post("/add", LatestGamesController.createLatestGame);
router.put("/:id", LatestGamesController.updateLatestGame);
router.delete("/:id", LatestGamesController.deleteLatestGame);

module.exports = router;

// TrendingDiscussionsRoutes.js
// Similar structure as LatestGamesRoutes but for trending discussions

// FeaturedGamesRoutes.js
// Similar structure as LatestGamesRoutes but for featured games
