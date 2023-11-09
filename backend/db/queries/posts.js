const db = require("../connection");
// get all posts for a community id
const getPosts = async (community_id) => {
  try {
    const post = await db.query(
      `SELECT *, CASE WHEN is_pinned = 'TRUE' THEN true ELSE false END as is_pinned
       FROM posts 
       WHERE community_id = $1;`,
      [community_id]
    );
    console.log("Fetched posts:", post.rows); // Log the fetched events
    return post.rows;
  } catch (error) {
    console.error("Error fetching posts:", error); // Log any errors
    throw error;
  }
};

// add post to community
const addPost = async (
  user_id,
  community_id,
  title,
  context,
  timestamp,
  is_pinned
) => {
  try {
    const post = await db.query(
      `INSERT INTO posts (user_id, community_id, title, context, timestamp, is_pinned) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, community_id, title, context, timestamp, is_pinned]
    );
    console.log("Fetched post:", post); // Log the fetched events
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

const addComment = async (post_id, comment, timestamp, user_id) => {
  try {
    const newComment = await db.query(
      `INSERT INTO comments (post_id, comment, timestamp, user_id) VALUES($1, $2, $3, $4) RETURNING *`,
      [post_id, comment, timestamp, user_id]
    );
    console.log("Fetched added comment:", newComment); // Log the fetched comments
    return newComment;
  } catch (error) {
    console.error("Error fetching comments:", error); // Log any errors
    throw error;
  }
};

const togglePin = async (post_id, isPinned) => {
  try {
    const result = await db.query(
      `UPDATE posts SET is_pinned = $1 WHERE post_id = $2 RETURNING *`,
      [isPinned ? "TRUE" : "FALSE", post_id]
    );
    console.log("Toggled pin for post_id:", post_id);
    return result.rows[0];
  } catch (error) {
    console.error("Error toggling pin:", error);
    throw error;
  }
};

module.exports = { getPosts, addPost, getComments, addComment, togglePin };
