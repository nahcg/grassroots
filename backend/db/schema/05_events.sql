DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR NOT NULL,
  community_id INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  datetime TIMESTAMP,
  location VARCHAR
);
