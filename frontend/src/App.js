import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";


import Landing from './views/Landing'; // Import the Landing component
import Home from "./views/Home";
import Community from "./views/Community";
import Event from "./views/Event";
import Register from "./views/Register";
import Volunteer from "./views/Volunteer";
import Profile from "./views/Profile";

import Navbar from "./components/Navbar";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import JoinCommunity from './components/JoinCommunity';

function App() {
  return (
    <div className="wrapper">
      <h1>Grassroots</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Navbar />
      <Routes>
      <Route path="/" element={<Landing />} /> {/* Display the Landing page on the root URL */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<Event />} />
        <Route path="/community" element={<Community />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/join-community" element={<JoinCommunity />} />
      </Routes>
    </div>
  );
}

export default App;
