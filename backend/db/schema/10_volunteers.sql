DROP TABLE IF EXISTS volunteers CASCADE;

CREATE TABLE volunteers (
  volunteers_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  volunteer_board_id INT REFERENCES volunteer_board(volunteer_board_id) ON DELETE CASCADE NOT NULL,
  join_date DATE NOT NULL
);
