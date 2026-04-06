import React, { useState } from "react";
import axios from "axios";

function Vote({ event }) {
  const [selected, setSelected] = useState("");

  const submitVote = async (option) => {
    if (!option) {
  alert("Please select an option ❗");
  return;
}
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://127.0.0.1:5000/api/response/submit",
      {
        eventId: event._id,
        selectedOption: option
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    alert("Vote submitted successfully ✅");
  } catch (err) {
   console.log("ERROR:", err.response?.data || err);
    alert("Error submitting vote ❌");
  }
};
  return (
  <div className="mt-4">
  <h4 className="font-semibold mb-2">Vote:</h4>

  {event.options.map((opt) => (
    <label key={opt} className="block mb-2 cursor-pointer">
      <input
        type="radio"
        name={`vote-${event._id}`}
        value={opt}
        onChange={(e) => setSelected(e.target.value)}
        className="mr-2"
      />
      {opt}
    </label>
  ))}

  <button
    onClick={() => submitVote(selected)}
    disabled={!selected}
    className="mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
  >
    Submit Vote
  </button>
</div>
);
}

export default Vote;