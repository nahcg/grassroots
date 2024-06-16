const db = require("../connection");

// return user specific skills
const getUserSkills = async (user_id) => {
  try {
    const userSkills = await db.query(
      `SELECT * FROM user_skills JOIN skills ON user_skills.skill_id = skills.skill_id WHERE user_id = $1`,
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

// const getAllSkills = () => {
//   return db
//     .query(`SELECT * FROM skills;`)
//     .then((res) => res.rows)
//     .catch((e) => {
//       return e;
//     });
// };

const updateUserSkillLevel = async (level, user_id, user_skills_id) => {
  try {
    const updatedSkill = await db.query(
      `UPDATE user_skills SET level = $1 WHERE user_id = $2 AND user_skills_id = $3 RETURNING *`,
      [level, user_id, parseInt(user_skills_id, 10)]
    );
    console.log("Updated skill2:", updatedSkill.rows[0]);
    return updatedSkill.rows[0];
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

module.exports = {
  getUserSkills,
  updateUserSkillLevel,
};
