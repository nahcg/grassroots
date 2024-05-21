const express = require("express");
const router = express.Router();
const eventQueries = require("../db/queries/events");

//express route for getting all events for user
// router.get("/:user_id", (req, res) => {
//   const user_id = req.params.user_id;
//   eventQueries
//     .getEventAttendee(parseInt(user_id))
//     .then((results) => {
//       res.json(results.rows);
//       console.log("results from route", results.rows);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;
