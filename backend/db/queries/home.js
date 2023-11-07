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

//get events by user and community_id
const getEventsByCommunity = async (user_id, community_id) => {
  try {
    const event = await db.query(
      `SELECT * FROM community_members JOIN events ON events.community_id = community_members.community_id WHERE user_id = $1 AND community_members.community_id = $2`,
      [user_id, community_id]
    );
    console.log("Fetched events:", event); // Log the fetched events
    console.log("user", user_id);
    console.log("community", community_id);
    return event;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

// get all posts authored by user_id
const getPosts = async (user_id) => {
  try {
    const posts = await db.query(
      `SELECT DISTINCT(posts.title), posts.timestamp, posts.context, posts.user_id, posts.post_id FROM community_members  JOIN posts ON posts.community_id = community_members.community_id WHERE posts.user_id = $1;`,
      [user_id]
    );
    console.log("Fetched events:", posts); // Log the fetched events
    return posts;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

// get communities user_id belongs to

const getCommunities = async (user_id) => {
  try {
    const communities = await db.query(
      `SELECT name, picture_url, communities.community_id AS community_id FROM communities JOIN community_members ON communities.community_id = community_members.community_id WHERE community_members.user_id = $1;`,
      [user_id]
    );
    console.log("Fetched communities", communities); // Log the fetched events
    return communities;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

// get all posts of all communities that user_id belongs to
//get all events of a user_id;
const getAllPosts = async (user_id) => {
  try {
    const posts = await db.query(
      `SELECT * FROM community_members JOIN posts ON posts.community_id = community_members.community_id WHERE community_members.user_id = $1`,
      [user_id]
    );
    console.log("Fetched posts:", posts); // Log the fetched events
    console.log("user", user_id);
    return posts;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

//get comments from post_id
const getAllComments = async (post_id) => {
  try {
    const comments = await db.query(
      `SELECT *
       FROM comments
       WHERE post_id = $1;`,
      [post_id]
    );
    console.log("Fetched comments:", comments);
    return comments;
  } catch (error) {
    console.error("Error fetching posts:", error); // Log any errors
    throw error;
  }
};

module.exports = {
  getEvents,
  getPosts,
  getCommunities,
  getAllPosts,
  getAllComments,
  getEventsByCommunity,
};
