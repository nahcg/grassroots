-- CREATE TABLE comments (
--   comment_id serial PRIMARY KEY NOT NULL,
--   post_id int REFERENCES posts(post_id),
--   user_id int REFERENCES users(userID),
--   comment TEXT,
--   timestamp time
-- );

INSERT INTO comments (post_id, comment, timestamp)
VALUES
  (1, 'Comment for Community', '2023-01-30 12:00:00'),
  (1, 'Comment for Community', '2023-02-28 14:30:00'),
  (1, 'Comment for Community', '2023-02-28 14:30:00'),
  (2, 'Comment for Community', '2023-02-28 14:30:00'),
  (2, 'Comment for Community', '2023-02-28 14:30:00'),
  (2, 'Comment for Community', '2023-02-28 14:30:00'),
  (3, 'Comment for Community', '2023-02-28 14:30:00'),
  (3, 'Comment for Community', '2023-02-28 14:30:00'),
  (3, 'Comment for Community', '2023-02-28 14:30:00'),
  (4, 'Comment for Community', '2023-02-28 14:30:00'),
  (4, 'Comment for Community', '2023-02-28 14:30:00'),
  (4, 'Comment for Community', '2023-02-28 14:30:00'),
  (5, 'Comment for Community', '2023-02-28 14:30:00'),
  (5, 'Comment for Community', '2023-02-28 14:30:00'),
  (5, 'Comment for Community', '2023-02-28 14:30:00');