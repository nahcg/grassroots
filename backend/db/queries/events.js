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

const editEvent = async (title, details, location, EventId, CommunityID) => {
  try {
    const event = await db.query(
      `UPDATE events SET title=$1, details=$2, location=$3 WHERE EventId=$4 AND CommunityID=$5`,
      [title, details, location, EventId, CommunityID]
    );
    console.log("Fetched events:", event); // Log the fetched events
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
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

module.exports = { getEvent, editEvent, getEventById, addEvent };
