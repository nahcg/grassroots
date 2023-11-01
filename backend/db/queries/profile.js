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



module.exports = { getCountOfCommunitiesJoined, getCountOfEventsJoined, getAllDistinctCausesJoined };
