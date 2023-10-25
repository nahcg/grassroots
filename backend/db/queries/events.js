const db = require("../connection");

// id serial PRIMARY KEY,
// CommunityID int REFERENCES Communities(id),
// Title varchar,
// Description text,
// DateTime timestamp

// Get events by communityID
// eslint-disable-next-line space-before-function-paren
const getEvent = async (id) => {
  try {
    const event = await db.query(
      `SELECT *
       FROM Events 
       WHERE CommunityID = $1;`,
      [id]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

module.exports = { getEvent };
