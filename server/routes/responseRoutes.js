const express = require("express");
const router = express.Router();

const Response = require("../models/Response");
const Event = require("../models/Event");

// 🗳️ Submit Vote
router.post("/submit", async (req, res) => {
  try {
    const { eventId, selectedOption } = req.body;

    // basic validation
    if (!eventId || !selectedOption) {
      return res.status(400).json("Missing data ❌");
    }

    const response = new Response({
      eventId,
      selectedOption,
      userId: "guest" // since no login
    });

    await response.save();

    res.json({ message: "Vote submitted successfully ✅" });

  } catch (err) {
    console.log("SUBMIT ERROR:", err);
    res.status(500).json("Server error ❌");
  }
});


// 📊 Get Results
router.get("/results/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    const responses = await Response.find({ eventId });
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json("Event not found ❌");
    }

    const resultCount = {};

    // initialize options
    event.options.forEach(opt => {
      resultCount[opt] = 0;
    });

    // count votes
    responses.forEach(r => {
      if (r.selectedOption) {
        resultCount[r.selectedOption]++;
      }
    });

    // winner logic
    let winner = null;
    if (Object.keys(resultCount).length > 0) {
      winner = Object.keys(resultCount).reduce((a, b) =>
        resultCount[a] > resultCount[b] ? a : b
      );
    }

    res.json({
      results: resultCount,
      winner: winner
    });

  } catch (err) {
    console.log("RESULT ERROR:", err);
    res.status(500).json("Internal Server Error ❌");
  }
});

module.exports = router;