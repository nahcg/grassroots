const db = require("../connection");

// return user specific skills
const getUserSkills = async (user_id) => {
  try {
    const userSkills = await db.query(
      `SELECT * FROM user_skills WHERE user_id = $1`,
      [user_id]
    );
    console.log("Fetched skills:", userSkills); // Log the fetched skills
    console.log("user", user_id);
    return userSkills;
  } catch (error) {
    console.error("Error fetching events:", error); // Log any errors
    throw error;
  }
};

const getAllSkills = () => {
  return db
    .query(`SELECT * FROM skills;`)
    .then((res) => res.rows)
    .catch((e) => {
      return e;
    });
};

module.exports = { getUserSkills, getAllSkills };
