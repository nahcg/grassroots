import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

// import Landing from "./views/Landing"; // Import the Landing component
import Landing2 from "./views/Landing2";
import Home from "./views/Home";
import Community from "./views/Community";
import Event from "./views/Event";
import Volunteer from "./views/Volunteer";
import Skills from "./views/Skills";
import Forum from "./components/Forum";
import Post from "./components/Post";
import Explore from "./views/Explore";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="wrapper">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing2 />} />{" "}
        {/* Display the Landing page on the root URL */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events/:community_id/*" element={<Event />} />
        <Route
          path="/communities/community/:community_id"
          element={<Community />}
        />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/posts/:community_id/*" element={<Forum />} />
        <Route path="/posts/comments/:post_id" element={<Post />} />
        <Route path="/profile/:email" element={<Skills />} />
      </Routes>
    </div>
  );
}

export default App;
