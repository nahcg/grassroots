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

router.post("/", (req, res) => {

});

/* READ */

// Return all volunteer positions
router.get("/", (req, res) => {
  volunteerQueries.getAllVolunteerPositions()
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
  volunteerQueries.getAllUserVolunteerPositions(userID)
    .then((positions) => {
      res.json(positions);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/* UPDATE */

// Update the name of the community
router.put("/name", (req, res) => {

});

/* DELETE */

router.delete("/:id", (req, res) => {

});

module.exports = router;
