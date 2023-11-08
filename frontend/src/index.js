import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

axios.defaults.baseURL = process.env.REACT_APP_BASEURL || 'http://localhost:8080';

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        // redirect_uri: window.location.origin,
        redirect_uri: "/home",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>,
);
