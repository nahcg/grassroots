-- DROP TABLE IF EXISTS posts CASCADE;

-- CREATE TABLE posts (
--   post_id SERIAL PRIMARY KEY NOT NULL,
--   user_id VARCHAR NOT NULL,
--   CommunityID INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL,
--   title VARCHAR NOT NULL,
--   context TEXT,
--   timestamp TIMESTAMP
-- );

INSERT INTO posts (community_id, user_id, title, context, timestamp, is_pinned)
VALUES
  (1, 'Mithra P', 'FAQ for Homesteading', '1. Research and Education
2. Evaluate Your Skills and Interests
3. Start Small
4. Plan Your Homestead
5. Develop Self-Sufficiency
6. Embrace Sustainability
7. Community and Networking
8. Prepare for Challenges
9. Stay Patient and Persistent', '2023-01-30 12:00:00', 'FALSE'),
  (1, 'Gloria C', 'How to Start Your Own Garden', 'Topics may include organic gardening, permaculture, companion planting, and crop rotation', '2023-02-28 14:30:00', 'FALSE'),
  (1, 'Swathi J', 'Composting', 'Creating nutrient-rich compost from kitchen scraps and garden waste is an essential practice for homesteaders, promoting soil health.', '2023-02-28 14:30:00', 'FALSE'),
  (1, 'Mithra P', 'Off-Grid Living', 'Alternative energy systems and water management', '2023-02-28 14:30:00', 'FALSE'),
  (4, 'Gloria C', 'Government Transparency', 'Ideas reagarding pushing for open government initiatives, freedom of information laws, and transparency in decision-making processes to enhance public accountability.', '2023-02-28 14:30:00', 'FALSE'),
  (4, 'Swathi J', 'Civic Education', 'Promoting political literacy, critical thinking, and understanding of democratic processes through education initiatives to empower citizens.B', '2023-02-28 14:30:00', 'FALSE'),
  (2, 'Swathi J', 'How to Organize a Local Food Drive', 'Participate in or organize local food drives during holidays or special events. Encourage your friends, family, and colleagues to contribute', '2023-02-28 14:30:00', 'FALSE'),
  (1, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE'),
  (1, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE'),
  (3, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE'),
  (3, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE'),
  (3, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE'),
  (3, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE'),
  (3, 'Swathi J', 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00', 'FALSE');

