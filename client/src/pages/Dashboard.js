import React, { useEffect, useState } from "react";
import axios from "axios";
import Vote from "./Vote";
import Results from "./Results";

function Dashboard() {
  console.log("Dashboard loaded 🚀");

const [events, setEvents] = useState([]);
const [category, setCategory] = useState("all");
const [search, setSearch] = useState("");
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ✅ Correct way to get token
        const token = localStorage.getItem("http://127.0.0.1:5000/api/events");

        console.log("Dashboard Token:", token);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);

        setEvents(res.data);
      } catch (err) {
        console.log("ERROR:", err.response || err);
      }
    };

    fetchEvents();
  }, []);
  return (
  <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

    {/* ✅ NAVBAR */}
    <div className="bg-white shadow-md p-4 flex justify-between items-center rounded-xl mb-6">
      <h1 className="text-xl font-bold text-blue-600">
        🗳️ AIML Voting System
      </h1>
    </div>

    {/* ✅ SEARCH BAR (ADD HERE) */}
    <input
      type="text"
      placeholder="Search events..."
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-4 p-3 rounded-lg shadow"
    />

    {/* ✅ FILTER BUTTONS */}
    <div className="flex gap-3 mb-6 justify-center">
      {["all", "class", "club", "project", "feedback"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full ${
            category === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>

    {/* ✅ EVENTS */}
    {events
      .filter(
        (e) =>
          (category === "all" || e.category === category) &&
          e.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((event) => (
        <div
          key={event._id}
          className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-6 hover:scale-105 hover:shadow-2xl transition duration-300"
        >
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p className="text-gray-600 mb-3">
            Category: {event.category}
          </p>

          <Vote event={event} />
          <Results eventId={event._id} />
        </div>
      ))}
  </div>
);
 
}

export default Dashboard;