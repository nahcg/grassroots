DROP TABLE IF EXISTS event_members CASCADE;

CREATE TABLE event_members (
  member_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  event_id INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL
);
