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
const getEvent = async (community_id) => {
  try {
    const event = await db.query(
      `SELECT *
       FROM Events 
       WHERE community_id = $1;`,
      [community_id]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const getEventById = async (community_id, event_id) => {
  try {
    const event = await db.query(
      `SELECT *
       FROM Events 
       WHERE community_id = $1
       AND event_id = $2`,
      [community_id, event_id]
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
  description,
  date,
  location,
  event_id,
  community_id
) => {
  try {
    const event = await db.query(
      `UPDATE events SET title=$1, description=$2, date=$3, location=$4 WHERE event_id=$5 AND community_id=$6 RETURNING *`,
      [title, description, date, location, event_id, community_id]
    );

    // Return the updated event data
    return event.rows[0];
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

const addEvent = async (community_id, title, description, date, location) => {
  try {
    const event = await db.query(
      `INSERT INTO events (community_id, title, description, date, location) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [community_id, title, description, date, location]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const deleteEvent = async (event_id, community_id) => {
  try {
    const event = await db.query(
      `DELETE FROM events WHERE event_id = $1 AND community_id = $2`,
      [event_id, community_id]
    );
    console.log("Fetched events1:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

module.exports = { getEvent, editEvent, getEventById, addEvent, deleteEvent };
