import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Community from "./views/Community";
import Event from "./views/Event";
import Register from "./views/Register";
import Volunteer from "./views/Volunteer";
import Profile from "./views/Profile";
import Forum from "./components/Forum";

import Navbar from "./components/Navbar";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";

function App() {
  return (
    <div className="wrapper">
      <h1>Grassroots</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:CommunityId" element={<Event />} />
        <Route path="/communities/community/:id" element={<Community />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts/:CommunityId" element={<Forum />} />
      </Routes>
    </div>
  );
}

export default App;
