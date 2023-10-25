/*
 * All routes for Communities Data are defined here
 * Since this file is loaded in server.js into /api/communities,
 *   these routes are mounted onto /api/communities
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const communitiesQueries = require('../db/queries/communities');

/* CREATE */

router.post('/', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const location = req.body.location;
  const cause = req.body.cause;
  const creation_date = req.body.creation_date;

  communitiesQueries.addNewCommunity(name, description, location, cause, creation_date)
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

// Return All Communities
router.get('/', (req, res) => {
  communitiesQueries.getAllCommunities()
    .then(communities => {
      res.json({ communities });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Return all communities of a certain type
router.get('/cause/:cause_id', (req, res) => {
  const cause = req.params.cause_id;

  communitiesQueries.getAllCauseCommunities(cause)
    .then(communities => {
      res.json({ communities });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


/* UPDATE */

router.put('', (req, res) => {

});

/* DELETE */

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  communitiesQueries.deleteCommunityById(id)
    .then(communities => {
      res.json({ communities });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
