import React, { useEffect, useState } from "react";
import axios from "axios";

function Results({ eventId }) {
  const [results, setResults] = useState({});
  const [winner, setWinner] = useState("");

 useEffect(() => {
  const fetchResults = async () => {
    try {
      // ✅ STEP 1: GET TOKEN
      const token = localStorage.getItem("token");
      console.log("Results Token:", token); // 👈 HERE

      // ✅ STEP 2: API CALL
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/response/results/${eventId}`)
    ;

      // ✅ STEP 3: DEBUG RESPONSE
      console.log("RESULT API:", res.data); // 👈 HERE

      // ✅ STEP 4: SET DATA
      setResults(res.data.results);
      setWinner(res.data.winner);

    } catch (err) {
      console.log("ERROR:", err.response); // 👈 HERE (important)
    }
  };

  fetchResults();
}, [eventId]);


  return (
 <div className="mt-4">
  <h4 className="font-semibold">Results:</h4>

  {results &&
    Object.keys(results).map((key) => (
      <p key={key}>
        {key}: {results[key]} votes
      </p>
    ))}

  {winner && (
    <p className="mt-2 font-bold text-green-600">
      🏆 Winner: {winner}
    </p>
  )}
</div>
);
}

export default Results;