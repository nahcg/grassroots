/*
 * All routes for Volunteering Data are defined here
 * Since this file is loaded in server.js into /volunteer,
 *   these routes are mounted onto /volunteer
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const volunteerQueries = require("../db/queries/volunteer");

/* CREATE */

// Add user to volunteer position
router.post("/:user_id/:volunteer_board_id", (req, res) => {
  const userId = req.params.user_id;
  const volunteer_board_id = req.params.volunteer_board_id;
  volunteerQueries
    .addVolunteerFromPosition(volunteer_board_id, userId)
    .then((position) => res.send(position));
});

// Create a new volunteer posting
router.post("/new", (req, res) => {
  const {
    name,
    description,
    status,
    location,
    cause,
    creation_date,
    start_date,
    end_date,
    volunteers_needed,
  } = req.body.params;
  volunteerQueries
    .addNewVolunteerPosting(
      name,
      description,
      status,
      location,
      cause,
      creation_date,
      start_date,
      end_date,
      volunteers_needed
    )
    .then((position) => res.send(position));
});

/* READ */

// Return all volunteer positions
router.get("/", (req, res) => {
  volunteerQueries
    .getAllVolunteerPositions()
    .then((positions) => {
      res.json(positions);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Return positions the user signed up for
router.get("/:user_id", (req, res) => {
  const userID = req.params.user_id;
  volunteerQueries
    .getAllUserVolunteerPositions(userID)
    .then((positions) => {
      res.json(positions);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Endpoint takes volunteer posting id and returns count of volunteers signed up to it
router.get("/count/:volunteer_board_id", (req, res) => {
  const volunteer_board_id = req.params.volunteer_board_id;
  volunteerQueries
    .getVolunteerCount(volunteer_board_id)
    .then((positions) => {
      res.json(positions);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/* UPDATE */

// TODO: Update the name of the community
router.put("/name", (req, res) => {});

/* DELETE */

router.delete("/:user_id/:volunteer_board_id", (req, res) => {
  const userId = req.params.user_id;
  const volunteer_board_id = req.params.volunteer_board_id;
  volunteerQueries
    .deleteVolunteerFromPosition(parseInt(volunteer_board_id), userId)
    .then((position) => res.json(position))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
