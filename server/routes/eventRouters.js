const express = require('express');

const { joinEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const {
  createEvent,
  getAllEvents,
  searchAndFilterEvents,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/search", searchAndFilterEvents);
router.patch('/:id/join', authMiddleware, joinEvent);


router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
