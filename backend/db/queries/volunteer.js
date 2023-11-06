const db = require("../connection");

const getAllVolunteerPositions = () => {
  return db
    .query(`
    SELECT * FROM volunteer_board;`
    )
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};

const getAllUserVolunteerPositions = (user_id) => {
  return db
    .query(`
    SELECT * FROM volunteers WHERE user_id=$1;`
      , [user_id])
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};

module.exports = { getAllVolunteerPositions, getAllUserVolunteerPositions };
