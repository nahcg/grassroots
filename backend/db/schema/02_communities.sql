DROP TABLE IF EXISTS communities CASCADE;

CREATE TABLE communities (
  community_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  cause INT NOT NULL,
  creation_date DATE
);
