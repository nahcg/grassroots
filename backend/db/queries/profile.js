const db = require("../connection");

// Return the count of the number of communities that the user is a member of
const getCountOfCommunitiesJoined = (user_id) => {
  return db.query(`
    SELECT COUNT(*) FROM community_members WHERE user_id = $1;
  `, [user_id])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

// Return the count of the number of events that the user is a member of
const getCountOfEventsJoined = (user_id) => {
  return db.query(`
    SELECT COUNT(*) FROM events WHERE user_id = $1;
  `, [user_id])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

// Return all the distinct numbers(aka causes) from the communities a user has joined
const getAllDistinctCausesJoined = (user_id) => {
  return db.query(`
    SELECT DISTINCT cause FROM community_members
    JOIN communities ON community_members.community_id = communities.community_id
    WHERE user_id = $1;
  `, [user_id])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

// to save user's skills
// const saveUserSkills = (user_id, skills) => {
//   return db.query(
//     'INSERT INTO user_skills(user_id, skill_id, experience_level) VALUES ($2, ) ',
//     [skills, user_id]
//   );
// };


// to save user's skills
const saveUserSkills = (user_id, skills) => {
  const values = skills.map(skill => `(${user_id}, ${skill.id}, 3)`).join(', ');
  return db.query(
    `INSERT INTO user_skills(user_id, skill_id, experience_level) VALUES ${values} RETURNING *;`
  ).then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
};

// to retrieve user's saved skills
const getUserSkills = (user_id) => {
  return db.query('SELECT skills FROM users WHERE id = $1', [user_id])
    .then((result) => {
      return result.rows[0] ? result.rows[0].skills : null; // Retrieve the skills or return null if no skills found
    })
    .catch((error) => {
      return error;
    });
};



module.exports = { getCountOfCommunitiesJoined, getCountOfEventsJoined, getAllDistinctCausesJoined, saveUserSkills, getUserSkills  };
