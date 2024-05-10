-- CREATE TABLE volunteer_board (
--   volunteer_board_id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   description TEXT,
--   location VARCHAR(255) NOT NULL,
--   cause INT NOT NULL,
--   creation_date DATE,
--   start_date DATE,
--   end_date DATE,
--   volunteers_needed INT NOT NULL
-- );

INSERT INTO volunteer_board (name, description, status, location, cause, creation_date, start_date, end_date, volunteers_needed)
VALUES
  ('Full Stack Developer', 'Looking for a full stack developer to help build a website for our community.', 'Open','Toronto, ON', 1, '2023-11-01 12:00:00', '2023-11-07 12:00:00', '2023-12-07 12:00:00', 3),
  ('Videographer', 'Looking for a videographer that can also edit videos to help film some content of our protest.',  'In Progress', 'Montreal, ON', 2, '2023-11-01 13:00:00', '2023-11-05 14:30:00', '2024-11-08 17:30:00', 5),
  ('Graphic Designer', 'Need someone to design some posters for our lunch and learn event.',  'Open', 'Montreal, ON', 3, '2023-11-01 13:00:00', '2023-11-05 14:30:00', '2024-11-08 17:30:00', 1),
  ('Photographer', '3 hours of photography while we march on parliment.',  'Open', 'Ottawa, ON', 1, '2023-11-06 13:00:00', '2023-11-18 14:30:00', '2024-11-18 17:30:00', 4);