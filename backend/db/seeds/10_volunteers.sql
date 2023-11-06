-- CREATE TABLE volunteers (
--   volunteers_id SERIAL PRIMARY KEY NOT NULL,
--   user_id VARCHAR(255) NOT NULL,
--   volunteer_board_id INT REFERENCES volunteer_board(volunteer_board_id) ON DELETE CASCADE NOT NULL,
--   join_date DATE NOT NULL,
-- );

INSERT INTO volunteers (user_id, volunteer_board_id, join_date)
VALUES
  ('smpere7@gmail.com', 1, '2023-11-01 12:00:00'),
  ('artisticallyfree@gmail.com', 1, '2023-11-01 12:00:00'),
  ('swathi1@gmail.com', 1, '2023-11-01 12:00:00'),
  ('smpere7@gmail.com', 2, '2023-11-01 12:00:00');
