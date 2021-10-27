-- CREATE DATABASE "shroom_logger"

-- USER TABLE WITH PROFILE INFORMATION
-- STORES IMAGE URL FROM AWS S3
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(120) NOT NULL UNIQUE,
  "password"  VARCHAR(120) NOT NULL,
  "date_created" timestamp NOT NULL DEFAULT NOW(),
  "profile_picture_medium" VARCHAR(120) DEFAULT 'https://solospikebucket.s3.us-east-2.amazonaws.com/photos/medium/gone%20camping.jpeg',
  "profile_picture_thumb" VARCHAR(120) DEFAULT 'https://solospikebucket.s3.us-east-2.amazonaws.com/photos/thumb/gone%20camping.jpeg'
);

-- LOG ENTRY TABLE 
CREATE TABLE "log_entry" (
  "id" SERIAL PRIMARY KEY,
  "date" TIMESTAMP NOT NULL DEFAULT NOW(),
  "latitude" DECIMAL,
  "longitude" DECIMAL,
  "details" VARCHAR(2000)
);

-- MUSHROOM NAMES TABLE
CREATE TABLE "mushroom_names" (
"id" SERIAL PRIMARY KEY,
"common_name" VARCHAR(100) NOT NULL,
"scientific_name" VARCHAR(255)
);

-- MUSHROOM PICTURE TABLE
-- STORES IMAGE URL FROM AWS S3
CREATE TABLE "mushroom_pictures" (
"id" SERIAL PRIMARY KEY,
"mushroom_picture_thumb" VARCHAR(100),
"mushroom_picture_medium" VARCHAR(100)
);

-- JUNCTION TABLE
-- This is many-to-many
CREATE TABLE "mushroom_junction" (
  "id" SERIAL PRIMARY KEY,
  "log_id" INT REFERENCES "log_entry" NOT NULL,
  "mushroom_names_id" INT REFERENCES "mushroom_names" NOT NULL,
  "mushroom_picture_id" INT REFERENCES "mushroom_pictures" NOT NULL,
  "user_id" INT REFERENCES "user" NOT NULL
);
