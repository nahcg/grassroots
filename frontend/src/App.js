<<<<<<< HEAD
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
=======
import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import LoginButton from "./components/login";

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        <LoginButton />
      </HashRouter>
    );
  }
}

export default App;
>>>>>>> refs/remotes/origin/master
