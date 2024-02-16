// featuredGamesRoutes.js
const express = require("express");
const router = express.Router();
const FeaturedGamesController = require("../Controllers/FeaturedGamesController");

router.get("/getAll", FeaturedGamesController.getAllFeaturedGames);
router.get("/:id", FeaturedGamesController.getFeaturedGameById);
router.post("/add", FeaturedGamesController.createFeaturedGame);
router.put("/:id", FeaturedGamesController.updateFeaturedGame);
router.delete("/:id", FeaturedGamesController.deleteFeaturedGame);

module.exports = router;

// TrendingDiscussionsRoutes.js
// Similar structure as LatestGamesRoutes but for trending discussions

// FeaturedGamesRoutes.js
// Similar structure as LatestGamesRoutes but for featured games
