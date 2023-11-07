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

// Return the count of Volunteers for a given Volunter Position
const getVolunteerCount = (volunteer_board_id) => {
  return db
    .query(`
    SELECT COUNT(*) FROM volunteers WHERE volunteer_board_id=$1;`
      , [volunteer_board_id])
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};

// Delete the user from a specified volunteer position
const deleteVolunteerFromPosition = async (volunteer_board_id, user_id) => {
  return db
    .query(`
    DELETE FROM volunteers WHERE volunteer_board_id = $1 AND user_id = $2`
      , [volunteer_board_id, user_id])
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};

// Add the user to a specified volunteer position
const addVolunteerFromPosition = async (volunteer_board_id, user_id) => {
  const currentDateTime = new Date().toJSON();
  try {
    const position = await db.query(
      `INSERT INTO volunteers (user_id, volunteer_board_id, join_date) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, volunteer_board_id, currentDateTime]
    );
    // console.log("Added position:", position); // Log the fetched events
    return position;
  } catch (error) {
    console.error("Error fetching position:", error); // Log any errors
    throw error;
  }
};

const addNewVolunteerPosting = (name, description, status, location, cause, creation_date, start_date, end_date, volunteers_needed) => {
  return db.query(
    `INSERT INTO volunteer_board (name, description, status, location, cause, creation_date, start_date, end_date, volunteers_needed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [name, description, status, location, parseInt(cause), creation_date, start_date, end_date, volunteers_needed]
  )
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};


module.exports = { getAllVolunteerPositions, getAllUserVolunteerPositions, getVolunteerCount, deleteVolunteerFromPosition, addVolunteerFromPosition, addNewVolunteerPosting };
