const Event = require("../models/Event");
const User = require("../models/User");
exports.createEvent = async (req, res) => {
  try {
   
    const { title, name, location, description, dateTime } = req.body;
    if (!title || !name || !location || !description || !dateTime) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search and filter events
exports.searchAndFilterEvents = async (req, res) => {
  try {
    const { title, filter, startDate, endDate } = req.query;
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    let start, end;
    const now = new Date();

    if (filter === "today") {
      start = new Date(now.setHours(0, 0, 0, 0));
      end = new Date(now.setHours(23, 59, 59, 999));
    } else if (filter === "currentWeek") {
      const first = now.getDate() - now.getDay();
      start = new Date(now.setDate(first));
      start.setHours(0, 0, 0, 0);
      end = new Date(now.setDate(first + 6));
      end.setHours(23, 59, 59, 999);
    } else if (filter === "lastWeek") {
      const first = now.getDate() - now.getDay() - 7;
      start = new Date(now.setDate(first));
      start.setHours(0, 0, 0, 0);
      end = new Date(now.setDate(first + 6));
      end.setHours(23, 59, 59, 999);
    } else if (filter === "currentMonth") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (filter === "lastMonth") {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    } else if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    }

    if (start && end) {
      query.dateTime = { $gte: start, $lte: end };
    }

    const events = await Event.find(query).sort({ dateTime: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update an event
exports.joinEvent = async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user.joinedEvents.includes(eventId)) {
      return res.status(400).json({ message: "Already joined this event" });
    }
    user.joinedEvents.push(eventId);
    await user.save();

    const event = await Event.findById(eventId);
    event.attendentCount += 1;
    await event.save();

    res.json({ message: "Joined event successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
