import React, { useState, useEffect } from "react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations") || "[]");
    setHistory(saved);
  }, []);

  return (
    <div>
      <h2>Previous Suggestions</h2>
      {history.map((session, i) => (
        <div key={i} className="chat-history">
          {session.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.from}`}>{msg.text}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HistoryPage;