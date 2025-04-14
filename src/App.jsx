import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import HistoryPage from "./components/HistoryPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Product Recommendation AI</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/history">Past Conversations</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;