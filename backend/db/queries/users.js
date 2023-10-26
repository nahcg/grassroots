const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const checkIfUserExists = (given_name, family_name, email) => {
  return db.query(`
    SELECT EXISTS (SELECT 1 FROM users WHERE first_name = $1 AND last_name = $2 AND email = $3);
  `, [given_name, family_name, email])
    .then(data => {
      console.log("checkIF user Exists ", data.rows);
      return data.rows;
    });
};

const addNewUser = (sub_id, username, first_name, last_name, email) => {
  return db.query(`
    INSERT INTO users (sub_id, username, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, [sub_id, username, first_name, last_name, email])
    .then(data => data.rows);
};

module.exports = { getUsers, checkIfUserExists, addNewUser };
