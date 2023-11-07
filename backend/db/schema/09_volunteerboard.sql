DROP TABLE IF EXISTS volunteer_board CASCADE;

CREATE TABLE volunteer_board (
  volunteer_board_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  cause INT NOT NULL,
  creation_date DATE,
  start_date DATE,
  end_date DATE,
  volunteers_needed INT NOT NULL
);
