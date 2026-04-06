const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create Event (Admin)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.id
    });

    await event.save();
    res.json("Event created successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // ✅ now valid
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ➕ CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const { title, type, category, options, isAnonymous } = req.body;

    const newEvent = new Event({
      title,
      type,
      category,
      options,
      isAnonymous,
      isActive: true
    });

    await newEvent.save();

    res.json("Event created successfully ✅");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;