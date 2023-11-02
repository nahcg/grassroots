const db = require("../connection");
// get all posts for a community id
const getPosts = async (community_id) => {
  try {
    const post = await db.query(
      `SELECT *
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
const addPost = async (community_id, title, context, timestamp) => {
  try {
    const post = await db.query(
      `INSERT INTO posts (community_id, title, context, timestamp) VALUES($1, $2, $3, $4) RETURNING *`,
      [community_id, title, context, timestamp]
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

const addComment = async (post_id, comment, timestamp) => {
  try {
    const newComment = await db.query(
      `INSERT INTO comments (post_id, comment, timestamp) VALUES($1, $2, $3) RETURNING *`,
      [post_id, comment, timestamp]
    );
    console.log("Fetched added comment:", newComment); // Log the fetched comments
    return newComment;
  } catch (error) {
    console.error("Error fetching comments:", error); // Log any errors
    throw error;
  }
};

module.exports = { getPosts, addPost, getComments, addComment };
