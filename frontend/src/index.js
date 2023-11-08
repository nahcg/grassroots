import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

axios.defaults.baseURL = process.env.REACT_APP_BASEURL || 'http://localhost:8080';

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-ehtvsgfhrdqhuole.us.auth0.com"
      clientId="jjAaGEPKXel2iltw3mO5fgRJWdFzzdjz"
      authorizationParams={{
        // redirect_uri: window.location.origin,
        redirect_uri: "http://localhost:3000/home",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>,
);
