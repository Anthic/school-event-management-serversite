const User = require("../models/User");
const Event = require("../models/Event"); 


exports.getMyEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("joinedEvents");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.joinedEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unjoinEvent = async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.id;
  try {
    const user = await User.findById(userId);
    user.joinedEvents = user.joinedEvents.filter(
      (eid) => eid.toString() !== eventId
    );
    await user.save();

    const event = await Event.findById(eventId);
    if (event && event.attendentCount > 0) {
      event.attendentCount -= 1;
      await event.save();
    }

    res.json({ message: "Event removed from your joined events" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
