const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  name: String,
  location: String,
  description: String,
  dateTime: Date,
  attendentCount: { type: Number, default: 0 }
});
module.exports = mongoose.model("Event", eventSchema);
