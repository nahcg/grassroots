import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Community from "./views/Community";
import Event from "./views/Event";
import Login from "./views/Login";
import Register from "./views/Register";
import Volunteer from "./views/Volunteer";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="wrapper">
      <h1>Grassroots</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<Event />} />
        <Route path="/community" element={<Community />} />
        <Route path="/volunteer" element={<Volunteer />} />
      </Routes>
    </div>
  );
}

export default App;
