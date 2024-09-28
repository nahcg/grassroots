# 🌱 GrassRoots App 🤝

## ℹ️ About

Social network website focused on connecting people and forming communities through common interests around social issues, driving action from the ground up through events and discussion.

### Contributors

<div align="center">
<img src="https://github.com/nahcg.png" width="60px;"/>
<img src="https://github.com/MithraPerera.png" width="60px;"/>
</div>

## 💻 App Demo

### Features
**User Home Page:** Logged in user sees the groups they belong to, the events and posts specific to their groups, and the post they've authored.
<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a04d02054b454c7d9ffcc6c61a19d754?sid=5a69f6e5-539d-4b8e-a490-9b7efc4aa994" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

**Groups:** Users can search and filter groups by interest, read about their relevant causes and join to get updates. Groups can be filtered by general interest such as social or political. Users can create new groups.
<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9484b2b4aa104ecd8d81d3eef2cb7bb5?sid=519dd23a-ab5d-46cf-be9c-8561f0dbc27a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

**Forum:** In each group, users can create posts and comment on others' posts. Users can star posts to pin them to the top for visibility.

**Volunteer Board:** Users can see, post and join volunteer positions past and present.

**Profiles:** Users can edit their own profile to include skills, interests and contact information. They can browse other profiles to see others' skills and groups they have joined.

### Tech Stack

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,express,nodejs,postgres,materialui,tailwind,css,oauth" />
  </a>
</p>

### Database & Application Setup

`git clone https://github.com/nahcg/grassroots.git` <br />
`cd grassroots`

Create the .env by using .env.example as a reference <br />
Update the .env file with your correct local information

Install dependencies: `npm i` <br />
Fix to binaries for sass: `npm rebuild node-sass`

Start the PostgreSQL server by using the psql command in terminal <br />
Create database and tables using node-postgres <br />
  ```CREATE DATABASE grassroots;``` <br />
  ```\c grassroots``` <br />

Reset database: `npm run db:reset`

```cd frontend``` 
Run the server: `npm run start`

```cd backend```
Run the server: `npm run start`

### Dependencies

