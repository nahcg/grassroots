DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR NOT NULL,
  community_id INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL ,
  title VARCHAR NOT NULL,
  context TEXT,
  timestamp TIMESTAMP
);
-- DROP TABLE IF EXISTS posts CASCADE;

-- CREATE TABLE posts (
--   post_id SERIAL PRIMARY KEY NOT NULL,
--   user_id VARCHAR NOT NULL,
--   community_id INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL,
--   title VARCHAR NOT NULL,
--   context TEXT,
--   timestamp TIMESTAMP
-- );