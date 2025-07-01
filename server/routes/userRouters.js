const express = require("express");
const router = express.Router();
const { getMyEvents, unjoinEvent } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/my-events", authMiddleware, getMyEvents);
router.patch('/my-events/:id/unjoin', authMiddleware, unjoinEvent);
module.exports = router;
