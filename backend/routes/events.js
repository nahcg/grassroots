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
router.post("/:CommunityId/:EventId", async (req, res) => {
  const EventId = req.params.EventId;
  const CommunityId = req.params.CommunityId;
  const { title, details, date, location } = req.body;

  try {
    // Update the event and wait for the result
    const updatedEvent = await eventQueries.editEvent(
      title,
      details,
      date,
      location,
      parseInt(EventId),
      parseInt(CommunityId)
    );

    // Get the updated event by its ID
    const event = await eventQueries.getEventById(CommunityId, EventId);

    // Send the updated event back as a response
    res.json(event.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete event
router.delete("/:CommunityId/:EventId", (req, res) => {
  const CommunityId = req.params.CommunityId;
  const EventId = req.params.EventId;
  eventQueries
    .deleteEvent(parseInt(CommunityId), parseInt(EventId))
    .then((results) => {
      console.log("Deleted event with EventId:", EventId);
      res.json(results.rows); // expected empty
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
