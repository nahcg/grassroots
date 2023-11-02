const db = require("../connection");

// Return all events for a given community id
const getAllCommunityEvents = (community_id) => {
  return db
    .query(
      `
    SELECT * FROM events WHERE community_id = $1
  `,
      [community_id]
    )
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};

// Add new event to the database and return the added event
const addNewCommunityEvent = (
  user_id,
  community_id,
  title,
  description,
  datetime,
  location
) => {
  const qs = `INSERT INTO events (user_id, community_id, title, description, datetime, location)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  return db
    .query(qs, [user_id, community_id, title, description, datetime, location])
    .then((res) => res.rows)
    .catch((err) => {
      return err;
    });
};

module.exports = { getAllCommunityEvents, addNewCommunityEvent };
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
