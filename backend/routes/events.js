/* eslint-disable space-before-function-paren */
const express = require("express");
const router = express.Router();
const eventQueries = require("../db/queries/events");

//express route for getting all events for a community
router.get("/:community_id", (req, res) => {
  const community_id = req.params.community_id;
  eventQueries
    .getEvent(parseInt(community_id))
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//add event to community
router.post("/:community_id", (req, res) => {
  const community_id = req.params.community_id;
  const { title, description, location, date } = req.body;
  console.log("reqbody", req.body);

  eventQueries
    .addEvent(parseInt(community_id), title, description, date, location)
    .then((results) => {
      res.json(results.rows[0]);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//show individual event under community by ID
router.get("/:community_id/:event_id", (req, res) => {
  const community_id = req.params.community_id;
  const event_id = req.params.event_id;
  eventQueries
    .getEventById(parseInt(community_id), parseInt(event_id))
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//express route for editing an event
router.post("/:community_id/:event_id", async (req, res) => {
  const event_id = req.params.event_id;
  const community_id = req.params.community_id;
  const { title, description, date, location } = req.body;

  try {
    // Update the event and wait for the result
    const updatedEvent = await eventQueries.editEvent(
      title,
      description,
      date,
      location,
      parseInt(event_id),
      parseInt(community_id)
    );

    // Get the updated event by its ID
    const event = await eventQueries.getEventById(community_id, event_id);

    // Send the updated event back as a response
    res.json(event.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete event
router.delete("/:community_id/:event_id", (req, res) => {
  const community_id = req.params.community_id;
  const event_id = req.params.event_id;
  eventQueries
    .deleteEvent(parseInt(community_id), parseInt(event_id))
    .then((results) => {
      console.log("Deleted event with EventId:", event_id);
      res.json(results.rows); // expected empty
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
