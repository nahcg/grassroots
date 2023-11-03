const db = require("../connection");

const getUser = async (community_id) => {
  try {
    const user = await db.query(
      `SELECT user_id
       FROM community_members
       WHERE community_id = $1;`,
      [community_id]
    );
    console.log("Fetched user:", user); // Log the fetched events
    return user;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const addUser = async (user_id, community_id, join_date, is_admin) => {
  try {
    const user = await db.query(
      `INSERT INTO community_members (user_id, community_id, join_date, is_admin) VALUES($1, $2, $3, $4) RETURNING *`,
      [user_id, community_id, join_date, is_admin]
    );
    console.log("Fetched user:", user); // Log the fetched events
    return user;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const deleteUser = async (user_id, community_id) => {
  try {
    const user = await db.query(
      `DELETE FROM community_members WHERE user_id = $1 AND community_id = $2`,
      [user_id, community_id]
    );
    console.log("Deleted user:", user); // Log the deleted user
    return user;
  } catch (error) {
    console.error("Error deleting user:", error); // Log any errors
    throw error;
  }
};

module.exports = { getUser, addUser, deleteUser };
