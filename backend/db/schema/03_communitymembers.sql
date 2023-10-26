DROP TABLE IF EXISTS community_members CASCADE;

CREATE TABLE community_members (
  membership_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  community_id INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL,
  join_date DATE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);
