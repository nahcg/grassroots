import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Landing2.css'; 
import earth from "../components/earth-image2.png";
import tree from "../components/tree.png";
import people from "../components/people.png";
import hand from "../components/hand.png";
import health from "../components/health.png";
import home from "../components/home.png";

const Landing2 = () => {
  return (
    <div className="landing_container">
      <div className="banner">
  <div className="aesteroid">
    <div className="stone"></div>
    <div className="stone"></div>
    <div className="stone"></div>
    <div className="stone"></div>
    <div className="stone"></div>
    <div className="stone"></div>
    <div className="stone"></div>
  </div>

      <div className="banner-text">
        <h1>Grassroots</h1>
        <ul>
          <li>Food Insecurity</li>
          <li>Digital Literacy</li>
          <li>Political Reform</li>
          <li>Healthcare Access</li>
          <li>Environmental Conservation</li>
          <li>Economic Equality</li>
        </ul>
      </div>

      <div className="earth">
        <div className="earth-img">
          <img src={earth} alt="" />
        </div>
        <div className="circle">
          <div className="icon"><img src={tree} alt="" /></div>
          <div className="icon"><img src={people} alt="" /></div>
          <div className="icon"><img src={hand} alt="" /></div>
          <div className="icon"><img src={home} alt="" /></div>
          <div className="icon"><img src={health} alt="" /></div>
        </div>
      </div>

      <div className="footer_text">
    <ul>
          <li>Mobilize</li>
          <li>Advocate</li>
          <li>Collaborate</li>
        </ul>
        <div className="get_started">
        <h1><Link to="/explore">Get Connected</Link></h1>
  </div>
  </div>
    </div>
    </div>
  );
}

export default Landing2;
