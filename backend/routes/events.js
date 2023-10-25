/* eslint-disable space-before-function-paren */
const express = require("express");
const router = express.Router();
const eventQueries = require("../db/queries/events");

//express route
router.get("/:id", (req, res) => {
  const id = req.params.id;
  eventQueries
    .getEvent(parseInt(id))
    .then((results) => {
      res.json(results.rows);
      console.log("results from route", results.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
