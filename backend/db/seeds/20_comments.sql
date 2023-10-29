-- CREATE TABLE comments (
--   comment_id serial PRIMARY KEY NOT NULL,
--   post_id int REFERENCES posts(post_id),
--   user_id int REFERENCES users(userID),
--   comment TEXT,
--   timestamp time
-- );

INSERT INTO comments (post_id, user_id, , title, context, timestamp)
VALUES
  (1, 1, '1', 'Content for Community A', '2023-01-30 12:00:00'),
  (1, 2, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (1, 3, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (2, 1, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (2, 1, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (2, 2, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (3, 2, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (3, 3, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (3, 3, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (3, 3, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00');