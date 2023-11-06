/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into /api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// const userQueries = require('../db/queries/users');

router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Add user to database if they don't exist in the database already
router.post("/register", (req, res) => {
  //console.log(req.body);
  const firstName = req.body.given_name;
  const lastName = req.body.family_name;
  const username = req.body.nickname;
  const profilePicture = req.body.picture;
  const email = req.body.email;
  const sub_id = req.body.sub;

  //console.log(firstName, lastName, email);

  const userExists = userQueries
    .checkIfUserExists("Mithra", "Perera", "user1@example.com")
    .then((data) => {
      console.log("im in users.js routes ", data[0]);
      return res.json({ result: data[0] });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

  //console.log(userExists);
  // if (userExists !== undefined) {
  //   console.log(userExists[0]);
  //   if (userExists.exists === false) {
  //     userQueries.addNewUser(sub_id, username, firstName, lastName, email)
  //       .then(data => console.log(data))
  //       .catch(err => {
  //         res
  //           .status(500)
  //           .json({ error: err.message });
  //       });
  //   }
  // }
});

module.exports = router;
