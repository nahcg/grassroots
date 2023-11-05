/*
 * All routes for Profile Data are defined here
 * Since this file is loaded in server.js into /profile,
 *   these routes are mounted onto /profile
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const profileQueries = require('../db/queries/profile.js');

/* CREATE */

// router.post('/', (req, res) => {

// });


/* READ */

// Return count of communities user has joined
router.get('/community-count', (req, res) => {
  const { user_id } = req.body;
  profileQueries.getCountOfCommunitiesJoined(user_id)
    .then(count => {
      // res.json({ count });
      res.send(count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Return count of events user has joined
router.get('/event-count', (req, res) => {
  const { user_id } = req.body;
  profileQueries.getCountOfEventsJoined(user_id)
    .then(count => {
      // res.json({ count });
      res.send(count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Return count of events user has joined
router.get('/causes', (req, res) => {
  const { user_id } = req.body;
  profileQueries.getAllDistinctCausesJoined(user_id)
    .then(causes => {
      // res.json({ causes });
      res.send(causes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//route to save the user's skills
router.post('/submitSkills/', (req, res) => {
  console.log(req)
  const { user_id, skills } = req.body;
  // const { skills } = req.body;

  profileQueries.saveUserSkills(user_id, JSON.parse(skills))
    .then(savedSkills => {
      // console.log(savedSkills);
      res.json({ message: 'Skills saved successfully', savedSkills });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

//route to retrieve the user's saved skills
router.get('/skills', (req, res) => {
  const { user_id } = req.query;
  profileQueries.getUserSkills(user_id)
    .then(skills => {
      res.json(skills);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



/* UPDATE */

// router.put('/', (req, res) => {

// });

/* DELETE */

// router.delete('/', (req, res) => {

// });

module.exports = router;
