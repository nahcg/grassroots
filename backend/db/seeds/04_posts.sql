-- DROP TABLE IF EXISTS posts CASCADE;

-- CREATE TABLE posts (
--   post_id SERIAL PRIMARY KEY NOT NULL,
--   user_id VARCHAR NOT NULL,
--   CommunityID INT REFERENCES communities(community_id) ON DELETE CASCADE NOT NULL,
--   title VARCHAR NOT NULL,
--   context TEXT,
--   timestamp TIMESTAMP
-- );

INSERT INTO posts (CommunityID, title, context, timestamp)
VALUES
  (1, 'FAQ for Homesteading', '1. What is homesteading?
Homesteading is a lifestyle and set of practices where individuals or families strive for self-sufficiency by growing their own food, raising livestock, and reducing reliance on modern amenities and commercial goods. It involves sustainable living, renewable energy use, and various do-it-yourself (DIY) skills.

2. What are the key principles of homesteading?
Homesteading principles include growing your own food, raising animals for meat, milk, and other products, preserving food through canning and drying, producing renewable energy, reducing waste, and embracing sustainable agricultural practices.

3. Is homesteading a self-sufficient lifestyle?
While homesteading aims for self-sufficiency, complete self-reliance is challenging in the modern world. Homesteaders often supplement their lifestyle with some modern conveniences, but the goal is to reduce dependence on external resources.

4. What skills are essential for homesteading?
Essential skills for homesteading include gardening, animal husbandry, food preservation, carpentry, basic plumbing and electrical work, sewing, and knowledge of renewable energy sources. Adaptability and problem-solving skills are also crucial.

5. Do I need a lot of land to start homesteading?
The amount of land needed for homesteading depends on the scale of your activities. Some homesteaders operate on a few acres, while others may require larger plots for extensive farming and livestock. It is essential to plan your activities based on the available land.

6. How can I learn homesteading skills?
You can learn homesteading skills through books, online resources, workshops, and hands-on experience. Local gardening clubs, agricultural extension offices, and community events are excellent places to connect with experienced homesteaders and learn practical skills.', '2023-01-30 12:00:00'),
  (1, 'How to Start Your Own Garden', 'Topics may include organic gardening, permaculture, companion planting, and crop rotation', '2023-02-28 14:30:00'),
  (1, 'Composting', 'Creating nutrient-rich compost from kitchen scraps and garden waste is an essential practice for homesteaders, promoting soil health.', '2023-02-28 14:30:00'),
  (1, 'Off-Grid Living', 'Alternative energy systems and water management', '2023-02-28 14:30:00'),
  (2, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (2, 'Post in Community B', 'Content for Community B', '2023-02-28 14:30:00'),
  (3, 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00'),
  (3, 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00'),
  (3, 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00'),
  (3, 'Post in Community C', 'Content for Community C', '2023-02-28 14:30:00');

