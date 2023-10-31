DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  comment_id serial PRIMARY KEY NOT NULL,
  post_id int REFERENCES posts(post_id),
  comment TEXT,
  timestamp TIMESTAMP
);