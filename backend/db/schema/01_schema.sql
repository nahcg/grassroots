DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Communities CASCADE;
DROP TABLE IF EXISTS CommunityMembers CASCADE;
DROP TABLE IF EXISTS Posts CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Skills CASCADE;
DROP TABLE IF EXISTS UserSkills CASCADE;


-- Create the Users table
CREATE TABLE Users (
  UserID serial PRIMARY KEY,
  SubID varchar,
  Username varchar,
  Email varchar,
  Password varchar,
  UserType varchar,
);

-- Create the Communities table
CREATE TABLE Communities (
  CommunityID serial PRIMARY KEY,
  Name varchar,
  Description text,
  Location varchar,
  CreationDate date
);

-- Create the CommunityMembers table
CREATE TABLE CommunityMembers (
  MembershipID serial PRIMARY KEY,
  UserID int REFERENCES Users(UserID),
  CommunityID int REFERENCES Communities(CommunityID),
  JoinDate date,
  Role varchar
);

-- Create the Posts table
CREATE TABLE Posts (
  PostID serial PRIMARY KEY,
  UserID int REFERENCES Users(UserID),
  CommunityID int REFERENCES Communities(CommunityID),
  Title varchar,
  Context text,
  Timestamp timestamp
);

-- Create the Events table
CREATE TABLE Events (
  EventID serial PRIMARY KEY,
  UserID int REFERENCES Users(UserID),
  CommunityID int REFERENCES Communities(CommunityID),
  Title varchar,
  Description text,
  DateTime timestamp,
  Location varchar
);

-- Create the Skills table
CREATE TABLE Skills (
  SkillID serial PRIMARY KEY,
  Name varchar,
  Description text
);

-- Create the UserSkills table
CREATE TABLE UserSkills (
  UserSkillID serial PRIMARY KEY,
  UserID int REFERENCES Users(UserID),
  SkillID int REFERENCES Skills(SkillID),
  ExperienceLevel varchar
);

