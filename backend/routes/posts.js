const express = require("express");
const router = express.Router();
const postQueries = require("../db/queries/posts");

//express route for getting all posts for a community
router.get("/:community_id", (req, res) => {
  const community_id = req.params.community_id;
  postQueries
    .getPosts(parseInt(community_id))
    .then((results) => {
      res.json(results);
      console.log("results from route", results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//post new post
router.post("/:community_id", (req, res) => {
  const community_id = req.params.community_id;
  const { user_id, title, context, timestamp } = req.body;

  postQueries
    .addPost(user_id, parseInt(community_id), title, context, timestamp)
    .then((results) => {
      res.json(results);
      console.log("results from route", results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//express route for getting all comments for a post
router.get("/comments/:post_id", (req, res) => {
  const post_id = req.params.post_id;
  postQueries
    .getComments(parseInt(post_id))
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/comments/:post_id", (req, res) => {
  const post_id = req.params.post_id;
  const { comment, timestamp } = req.body;

  postQueries
    .addComment(post_id, comment, timestamp)
    .then((results) => {
      res.json(results);
      console.log("results from comment post", results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
