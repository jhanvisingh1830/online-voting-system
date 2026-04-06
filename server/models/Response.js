const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  eventId: String,
  selectedOption: String,
  responseText: String,
  userId: String // null if anonymous
});

module.exports = mongoose.model("Response", responseSchema);