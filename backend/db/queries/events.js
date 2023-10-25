const db = require("../connection");

// Return all events for a given community id
const getAllCommunityEvents = (community_id) => {
  return db.query(`
    SELECT * FROM events WHERE community_id = $1
  `, [community_id])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

// Add new event to the database and return the added event
const addNewCommunityEvent = (user_id, community_id, title, description, datetime, location) => {
  const qs = `INSERT INTO events (user_id, community_id, title, description, datetime, location)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  return db.query(qs, [user_id, community_id, title, description, datetime, location])
    .then(res => res.rows)
    .catch((err) => {
      return err;
    });
};

module.exports = { getAllCommunityEvents, addNewCommunityEvent };
