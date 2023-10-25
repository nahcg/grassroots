const db = require("../connection");

// Return all posts for a given community id
const getAllCommunityPosts = (community_id) => {
  return db.query(`
    SELECT * FROM posts WHERE community_id = $1
  `, [community_id])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

// Add new post to the database and return the added post
const addNewCommunityPost = (user_id, community_id, title, context, timestamp) => {
  const qs = `INSERT INTO posts (user_id, community_id, title, context, timestamp)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  return db.query(qs, [user_id, community_id, title, context, timestamp])
    .then(res => res.rows)
    .catch((err) => {
      return err;
    });
};

module.exports = { getAllCommunityPosts, addNewCommunityPost };
