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
<video src="https://github.com/user-attachments/assets/6800739e-5562-4795-8534-5caf011d6c71" width="740" height="360"></video>
<br />

**Groups:** Users can search and filter groups by interest, read about their relevant causes and join to get updates. Groups can be filtered by general interest such as social or political. Users can create new groups.
<video src="https://github.com/user-attachments/assets/0daca352-a602-40df-871c-f57e560c57d8" width="740" height="360"></video>
<br />

**Forum:** In each group, users can create posts and comment on others' posts. Users can star posts to pin them to the top for visibility.
<video src="https://github.com/user-attachments/assets/b114496e-308a-4666-8e49-9ef9ab33c84d" width="740" height="360"></video>
<br />

**Volunteer Board:** Users can see, post and join volunteer positions past and present.
<video src="https://github.com/user-attachments/assets/d80cfbb8-53b9-443f-ad48-a29127745d98" width="740" height="360"></video>
<br />

**Profiles:** Users can edit their own profile to include skills, interests and contact information. They can browse other profiles to see others' skills and groups they have joined.
<video src="https://github.com/user-attachments/assets/9e4aeb31-a522-4503-80fe-968626243a8b" width="740" height="360"></video>

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
`CREATE DATABASE grassroots;` <br />
`\c grassroots` <br />

Reset database: `npm run db:reset`

`cd frontend`
Run the server: `npm run start`

`cd backend`
Run the server: `npm run start`

### Dependencies

- React
- Express
- Axios
- PG
- Material UI
