DROP TABLE IF EXISTS user_skills CASCADE;

CREATE TABLE user_skills (
  user_skill_id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE NOT NULL,
  experience_level INT NOT NULL
);
