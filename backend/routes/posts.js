/*
 * All routes for Posts Data are defined here
 * Since this file is loaded in server.js into /api/posts,
 *   these routes are mounted onto /api/posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const postsQueries = require('../db/queries/posts');

/* CREATE */

// Create a post and store in the database
router.post('/', (req, res) => {
  const user_id = req.body.user_id;
  const community_id = req.body.community_id;
  const title = req.body.title;
  const context = req.body.context;
  const timestamp = req.body.timestamp;

  postsQueries.addNewCommunityPost(user_id, community_id, title, context, timestamp)
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

// Return All posts for a given community id
router.get('/community/:community_id', (req, res) => {
  const community_id = req.params.community_id;

  postsQueries.getAllCommunityPosts(community_id)
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
//TODO: Update specific post only if it belongs to the user OR we do not let users update posts
router.put('/:id', (req, res) => {

});

/* DELETE */
// TODO: Allow user to delete post only if the post belongs to them OR we do not let users delete posts
router.delete('/:id', (req, res) => {

});


module.exports = router;
