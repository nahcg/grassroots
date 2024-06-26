// load .env data into process.env
require("dotenv").config();

// Import required modules
// Web server config
// const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

// app.set("view engine", "ejs");

// Middleware setup
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors());
// app.use(
//   "/styles",
//   sassMiddleware({
//     source: __dirname + "/styles",
//     destination: __dirname + "/public/styles",
//     isSass: false, // false => scss, true => sass
//   })
// );
// Serve static files from the 'public' directory
// app.use(express.static("public"));

const skillsRoutes = require("./routes/skills");
const eventsRoutes = require("./routes/events");
const communitiesRoutes = require("./routes/communities");
const postsRoutes = require("./routes/posts");
const volunteerRoutes = require("./routes/volunteer");
const memberRoutes = require("./routes/member");
const homeRoutes = require("./routes/home");
const eventMemberRoutes = require("./routes/eventmembers");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use("/api/users", userApiRoutes);
app.use("/profile", skillsRoutes);
app.use("/events", eventsRoutes);
app.use("/communities", communitiesRoutes);
app.use("/posts", postsRoutes);
app.use("/events", eventsRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/member", memberRoutes);
app.use("/home", homeRoutes);
app.use("/eventmembers", eventMemberRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  // eslint-disable-next-line linebreak-style
  console.log(`Example app listening on port ${PORT}`);
});
