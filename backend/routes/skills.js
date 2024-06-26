const express = require("express");
const router = express.Router();
const skillsQueries = require("../db/queries/skills");
const eventQueries = require("../db/queries/events");

// Express route for getting all events for a user
router.get("/events", (req, res) => {
  const user_id = req.query.user_id; // Access user_id from query parameters
  eventQueries
    .getUserEvents(user_id)
    .then((results) => {
      res.json(results.rows);
      console.log("results from route1", results.rows);
      console.log("user", user_id);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//express route for getting all skills
router.get("/", (req, res) => {
  skillsQueries
    .getAllSkills()
    .then((results) => {
      res.json(results);
      console.log("results from route", results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//express route for getting all skills for specific user
router.get("/user", (req, res) => {
  const user_id = req.query.user_id;
  skillsQueries
    .getUserSkills(user_id)
    .then((results) => {
      res.json(results.rows);
      console.log("results from route1", results.rows);
      console.log("user2", user_id);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/user/:user_id/skill/:user_skills_id", (req, res) => {
  const { user_id, user_skills_id } = req.params;
  const { level } = req.body;
  skillsQueries
    .updateUserSkillLevel(level, user_id, parseInt(user_skills_id, 10))
    .then((updatedSkill) => {
      res.json(updatedSkill);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/skills", (req, res) => {
  const { name } = req.body;
  skillsQueries
    .insertSkill(name)
    .then((newSkill) => {
      res.json(newSkill);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
