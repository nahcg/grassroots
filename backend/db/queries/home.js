const db = require("../connection");

//get all events of a user_id;
const getEvents = async (user_id) => {
  try {
    const event = await db.query(
      `SELECT * FROM community_members JOIN events ON events.community_id = community_members.community_id WHERE user_id = $1`,
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

const getPosts = async (user_id) => {
  try {
    const posts = await db.query(
      `SELECT DISTINCT(posts.title), posts.timestamp, posts.context, posts.user_id FROM community_members  JOIN posts ON posts.community_id = community_members.community_id WHERE posts.user_id = $1;`,
      [user_id]
    );
    console.log("Fetched events:", posts); // Log the fetched events
    console.log("user", user_id);
    return posts;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

module.exports = { getEvents, getPosts };
