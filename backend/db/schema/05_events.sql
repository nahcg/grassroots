DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(user_id) NOT NULL,
  community_id INT REFERENCES communities(community_id) NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  datetime TIMESTAMP,
  location VARCHAR
);
