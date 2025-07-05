const express = require("express");
const router = express.Router();
const { getMyEvents, unjoinEvent } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getMyEvents);
router.patch('/:id/unjoin', authMiddleware, unjoinEvent);
module.exports = router;
