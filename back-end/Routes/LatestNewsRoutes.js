// LatestNewsRoutes.js
const express = require("express");
const router = express.Router();
const LatestNewsController = require("../Controllers/LatestNewsController");

router.get("/getAll", LatestNewsController.getAllLatestNews);
router.get("/:id", LatestNewsController.getLatestNewsById);
router.post("/add", LatestNewsController.createLatestNews);
router.put("/:id", LatestNewsController.updateLatestNews);
router.delete("/:id", LatestNewsController.deleteLatestNews);

module.exports = router;