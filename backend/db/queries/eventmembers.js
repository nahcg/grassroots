const db = require("../connection");

const addEventAttendee = async (user_id, event_id) => {
  try {
    const user = await db.query(
      `INSERT INTO event_members (user_id, event_id) VALUES($1, $2) RETURNING *`,
      [user_id, event_id]
    );
    console.log("Fetched user:", user); // Log the fetched events
    return user;
  } catch (error) {
    console.error("Error fetching user:", error); // Log any errors
    throw error;
  }
};

const deleteEventAttendee = async (user_id, event_id) => {
  try {
    const user = await db.query(
      `DELETE FROM event_members WHERE user_id = $1 AND event_id = $2`,
      [user_id, event_id]
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

module.exports = {
  addEventAttendee,
  deleteEventAttendee,
  getEventAttendee,
};
