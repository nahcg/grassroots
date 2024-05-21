/* eslint-disable space-before-function-paren */
const express = require("express");
const router = express.Router();
const eventMemberQueries = require("../db/queries/eventmembers");

//get members for event
router.get("/:event_id", (req, res) => {
  const event_id = req.params.event_id;
  const user_id = req.body.user_id;
  eventMemberQueries
    .getEventAttendee(event_id)
    .then((results) => {
      res.json(results.rows);
      console.log("members:", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add user to event
router.put("/:event_id", (req, res) => {
  const event_id = req.params.event_id;
  const user_id = req.body.user_id;
  eventMemberQueries
    .addEventAttendee(user_id, event_id)
    .then((results) => {
      res.json(results.rows);
      console.log("added members:", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// delete user from event
router.delete("/:event_id", (req, res) => {
  const event_id = req.params.event_id;
  const user_id = req.body.user_id;
  eventMemberQueries
    .deleteEventAttendee(user_id, event_id)
    .then((results) => {
      res.json(results.rows);
      console.log("Deleted user:", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
