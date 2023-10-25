import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./views/Landing"; // Import the Landing component
import Home from "./views/Home";
import Community from "./views/Community";
import Event from "./views/Event";
import Volunteer from "./views/Volunteer";
import Profile from "./views/Profile";
import Explore from "./views/Explore";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <div className="wrapper">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />{" "}
        {/* Display the Landing page on the root URL */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/community" element={<Community />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
