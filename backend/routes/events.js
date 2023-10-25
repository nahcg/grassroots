/*
 * All routes for Events Data are defined here
 * Since this file is loaded in server.js into /api/events,
 *   these routes are mounted onto /api/events
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const eventsQueries = require('../db/queries/events');

/* CREATE */

// Create an event under a given community and store in the database
router.post('/', (req, res) => {
  const user_id = req.body.user_id;
  const community_id = req.body.community_id;
  const title = req.body.title;
  const description = req.body.description;
  const datetime = req.body.datetime;
  const location = req.body.location;

  eventsQueries.addNewCommunityEvent(user_id, community_id, title, description, datetime, location)
    .then((data) => {
      // console.log("data params: ", data);
      return res.json({ data });
    })
    .catch((e) => {
      console.log("Error: ", e);
      return res.status(500).send('Error adding new community');
    });
});

/* READ */

// Return All events for a given community id
router.get('/community/:community_id', (req, res) => {
  const community_id = req.params.community_id;

  eventsQueries.getAllCommunityEvents(community_id)
    .then(posts => {
      res.json({ posts });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

/* UPDATE */
//TODO: Update specific event only if it belongs to the user OR we do not let users update events
router.put('/:id', (req, res) => {

});

/* DELETE */
// TODO: Allow user to delete event only if the event belongs to them OR we do not let users delete event
router.delete('/:id', (req, res) => {

});


module.exports = router;
