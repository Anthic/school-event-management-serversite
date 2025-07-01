const express = require('express');

const { joinEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const {
  createEvent,
  getAllEvents,
  searchAndFilterEvents,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/search", searchAndFilterEvents);
router.patch('/events/:id/join', authMiddleware, joinEvent);


router.put('/events/:id', authMiddleware, updateEvent);
router.delete('/events/:id', authMiddleware, deleteEvent);

module.exports = router;
