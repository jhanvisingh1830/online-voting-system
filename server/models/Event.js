const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  type: String,

  // ✅ ADD THIS
  category: {
    type: String,
    enum: ["class", "club", "project", "feedback"],
    required: true
  },

  options: [String],
  isAnonymous: Boolean,
  createdBy: String,
  isActive: Boolean
});

module.exports = mongoose.model("Event", eventSchema);