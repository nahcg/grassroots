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

const addEventAttendee = async (member_id, user_id, event_id) => {
  try {
    const user = await db.query(
      `INSERT INTO event_members (member_id, user_id, event_id) VALUES($1, $2, $3) RETURNING *`,
      [member_id, user_id, event_id]
    );
    console.log("Fetched user:", user); // Log the fetched events
    return user;
  } catch (error) {
    console.error("Error fetching user:", error); // Log any errors
    throw error;
  }
};

const deleteEventAttendee = async (event_id, user_id) => {
  try {
    const user = await db.query(
      `DELETE FROM event_attendees WHERE event_id = $1 AND user_id = $2`,
      [event_id, user_id]
    );
    return user;
  } catch (error) {
    console.error("Error deleting user:", error); // Log any errors
    throw error;
  }
};

// get event attendee names and event name
const getEventAttendee = async (event_id) => {
  try {
    const event = await db.query(
      `SELECT *
       FROM event_members
       WHERE event_id = $1`,
      [event_id]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

//get events that user_id has joined
const getUserEvents = async (user_id) => {
  try {
    const event = await db.query(
      `SELECT * FROM Events JOIN event_members ON event_members.event_id = Events.event_id WHERE event_members.user_id = $1;`,
      [user_id]
    );
    console.log("Fetched events:", event); // Log the fetched events
    console.log("user", user_id);
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

module.exports = {
  getEvent,
  editEvent,
  getEventById,
  addEvent,
  deleteEvent,
  addEventAttendee,
  deleteEventAttendee,
  getEventAttendee,
  getUserEvents,
};
