DROP TABLE IF EXISTS user_skills CASCADE;

CREATE TABLE user_skills (
  user_skills_id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) REFERENCES users(email),
  skill_id INT REFERENCES skills(skill_id),
  level VARCHAR(255) NOT NULL CHECK (level in ('Beginner', 'Intermediate', 'Advanced'))
);

