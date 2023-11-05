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

module.exports = { getAllVolunteerPositions };
