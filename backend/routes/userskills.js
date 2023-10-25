/*
 * All routes for Events Data are defined here
 * Since this file is loaded in server.js into /api/events,
 *   these routes are mounted onto /api/events
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const user_skills_Queries = require('../db/queries/userskills');

/* CREATE */

// TODO: Add a skill to a user
router.post('/', (req, res) => {

});

/* READ */

// TODO: Return All skills for a given user
router.get('/community/:community_id', (req, res) => {

});

/* UPDATE */


/* DELETE */
// TODO: Delete a skill from a user
router.delete('/:id', (req, res) => {

});


module.exports = router;
