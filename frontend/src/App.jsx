import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import "./css/App.css"; // Import the CSS file for styling
import Home from "./pages/Home";
import AuthForm from "./pages/Authform";
import Landing from "./pages/Landing";
import EmailList from "./pages/EmailList";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/start" element={<AuthForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dash" element={<EmailList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
