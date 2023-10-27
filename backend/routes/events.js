/* eslint-disable space-before-function-paren */
const express = require("express");
const router = express.Router();
const eventQueries = require("../db/queries/events");

//express route for getting all events for a community
router.get("/:CommunityId", (req, res) => {
  const CommunityId = req.params.CommunityId;
  eventQueries
    .getEvent(parseInt(CommunityId))
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//add event to community
router.post("/:CommunityId", (req, res) => {
  const CommunityId = req.params.CommunityId;
  const { title, details, location, date } = req.body;
  console.log("reqbody", req.body);

  eventQueries
    .addEvent(parseInt(CommunityId), title, details, date, location)
    .then((results) => {
      res.json(results.rows[0]);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//show individual event under community by ID
router.get("/:CommunityId/:EventId", (req, res) => {
  const CommunityId = req.params.CommunityId;
  const EventId = req.params.EventId;
  eventQueries
    .getEventById(parseInt(CommunityId), parseInt(EventId))
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//express route for editing an event
router.put("/:CommunityId/:EventId", (req, res) => {
  const EventId = req.params.EventId;
  const CommunityId = req.params.CommunityId;
  const { title, details, location } = req.body;

  eventQueries
    .editEvent([
      title,
      details,
      location,
      parseInt(EventId),
      parseInt(CommunityId),
    ])
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
