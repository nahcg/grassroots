const db = require("../connection");
// get all posts for a community id
const getPosts = async (CommunityId) => {
  try {
    const post = await db.query(
      `SELECT *
       FROM posts 
       WHERE CommunityID = $1;`,
      [CommunityId]
    );
    console.log("Fetched posts:", post); // Log the fetched events
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error); // Log any errors
    throw error;
  }
};

//get comments for post
const getComments = async (post_id) => {
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

module.exports = { getPosts, getComments };
