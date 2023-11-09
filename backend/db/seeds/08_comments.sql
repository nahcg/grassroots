-- CREATE TABLE comments (
--   comment_id serial PRIMARY KEY NOT NULL,
--   post_id int REFERENCES posts(post_id),
--   user_id int REFERENCES users(userID),
--   comment TEXT,
--   timestamp time
-- );

INSERT INTO comments (post_id, comment, timestamp, user_id)
VALUES
  (1, 'Comment for Community', '2023-01-30 12:00:00', 'Gloria C'),
  (1, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'),
  (1, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'),
  (2, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (2, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'),
  (2, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (3, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'),
  (3, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'),
  (3, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (4, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (4, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (4, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (5, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'),
  (5, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (6, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (7, 'Comment for Community', '2023-02-28 14:30:00', 'Gloria C'), 
  (8, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),
  (9, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P'),       
  (9, 'Comment for Community', '2023-02-28 14:30:00', 'Mithra P');
