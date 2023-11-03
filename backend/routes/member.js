const express = require("express");
const router = express.Router();
const memberQueries = require("../db/queries/member");

//show members of community
router.get("/:community_id", (req, res) => {
  const community_id = req.params.community_id;
  memberQueries
    .getUser(parseInt(community_id))
    .then((results) => {
      res.json(results.rows);
      console.log("Fetched members:", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:community_id/", (req, res) => {
  const community_id = req.params.community_id;
  const { user_id, join_date, is_admin } = req.body;
  memberQueries
    .addUser(user_id, community_id, join_date, is_admin)
    .then((results) => {
      res.json(results.rows);
      console.log("Fetched members:", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:community_id/", (req, res) => {
  const community_id = req.params.community_id;
  const user_id = req.body.user_id;
  memberQueries
    .deleteUser(user_id, community_id)
    .then((results) => {
      res.json(results.rows);
      console.log("Deleted user:", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
