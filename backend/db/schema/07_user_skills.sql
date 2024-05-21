DROP TABLE IF EXISTS user_skills CASCADE;

CREATE TABLE user_skills (
  user_skills_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) REFERENCES users(email),
  name VARCHAR(225) REFERENCES skills(name),
  level VARCHAR(255) NOT NULL CHECK (level in ('Beginner', 'Intermediate', 'Advanced'))
);

