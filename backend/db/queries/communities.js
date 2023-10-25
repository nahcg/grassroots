const db = require("../connection");

const getAllCommunities = () => {
  return db.query(`
    SELECT * FROM communities;
  `)
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

const getAllCauseCommunities = (cause) => {
  return db.query(`
    SELECT * FROM communities WHERE cause = $1
  `, [cause])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

const deleteCommunityById = (id) => {
  return db.query(`
    DELETE FROM communities WHERE community_id = $1 RETURNING *
  `, [id])
    .then(res => res.rows)
    .catch((e) => {
      return e;
    });
};

const addNewCommunity = (name, description, location, cause, creation_date) => {
  const qs = `INSERT INTO communities (name, description, location, cause, creation_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  return db.query(qs, [name, description, location, cause, creation_date])
    .then(res => res.rows)
    .catch((err) => {
      return err;
    });
};

const updateCommunityName = (id, name) => {
  const qs = `
  UPDATE communities SET name = $1 WHERE community_id = $2 RETURNING *
  `;
  return db.query(qs, [name, id])
    .then(res => res.rows)
    .catch((err) => {
      return err;
    });
};

module.exports = { getAllCommunities, getAllCauseCommunities, deleteCommunityById, addNewCommunity, updateCommunityName };
