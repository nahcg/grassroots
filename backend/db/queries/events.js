/* eslint-disable camelcase */
const db = require("../connection");

// id serial PRIMARY KEY,
// CommunityID int REFERENCES Communities(id),
// Title varchar,
// Description text,
// DateTime timestamp
// Location varchar

// Get events by communityID
// eslint-disable-next-line space-before-function-paren
const getEvent = async (CommunityId) => {
  try {
    const event = await db.query(
      `SELECT *
       FROM Events 
       WHERE CommunityID = $1;`,
      [CommunityId]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const getEventById = async (CommunityId, EventId) => {
  try {
    const event = await db.query(
      `SELECT *
       FROM Events 
       WHERE CommunityID = $1
       AND EventId = $2`,
      [CommunityId, EventId]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const editEvent = async (
  title,
  details,
  date,
  location,
  EventId,
  CommunityID
) => {
  try {
    const event = await db.query(
      `UPDATE events SET title=$1, details=$2, date=$3, location=$4 WHERE EventId=$5 AND CommunityId=$6 RETURNING *`,
      [title, details, date, location, EventId, CommunityID]
    );

    // Return the updated event data
    return event.rows[0];
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

const addEvent = async (CommunityID, Title, Details, Date, Location) => {
  try {
    const event = await db.query(
      `INSERT INTO events (CommunityID, Title, Details, Date, Location) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [CommunityID, Title, Details, Date, Location]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const deleteEvent = async (EventId, CommunityId) => {
  try {
    const event = await db.query(
      `DELETE FROM events WHERE EventId = $1 AND CommunityId = $2`,
      [EventId, CommunityId]
    );
    console.log("Fetched events1:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

module.exports = { getEvent, editEvent, getEventById, addEvent, deleteEvent };
const db = require("../connection");

<<<<<<< HEAD
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
=======
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
>>>>>>> 18ad89c (Calendar feature)
