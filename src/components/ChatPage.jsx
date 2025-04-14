import React, { useState } from "react";
import responses from "../responses.json";
import { Link } from "react-router-dom";
import "./ChatPage.css";

function ChatPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [showBudgetPrompt, setShowBudgetPrompt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userQuery = input.trim();
    if (!userQuery) return;

    setChat((prev) => [...prev, { from: "user", text: userQuery }]);

    const answer = responses[userQuery.toLowerCase()];
    if (answer) {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "Please select your budget (500 - 1000, 1000 - 1500, 1500 - 2000)" },
      ]);
      setShowBudgetPrompt(true);
    } else {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I did not understand your query!" },
      ]);
    }

    setInput("");
  };

  const handleSave = () => {
    const existing = JSON.parse(localStorage.getItem("conversations") || "[]");
    const updated = [...existing, chat];
    localStorage.setItem("conversations", JSON.stringify(updated));
  };

  const handleReset = () => {
    setChat([]);
    setShowBudgetPrompt(false);
    setInput("");
  };

  return (
    <div className="chat-page">
      <div className="chat-box">
        {chat.map((msg, idx) => (
          <div key={idx} className={`msg ${msg.from}`}>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Please tell me about your query!"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ask</button>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
      <Link to="/" onClick={handleReset}>Want new suggestion?</Link>
    </div>
  );
}

export default ChatPage;