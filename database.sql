
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"date_created" timestamp NOT NULL DEFAULT NOW(),
	"profile_picture_medium" varchar(100) DEFAULT 'https://unsplash.com/photos/p7h0wkbtAQ0',
	"profile_picture_thumb" varchar(100) DEFAULT 'https://unsplash.com/photos/p7h0wkbtAQ0');

CREATE TABLE "log_entry" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer NOT NULL,
	"date" TIMESTAMP NOT NULL DEFAULT NOW(),
	"latitude" DECIMAL,
	"longitude" DECIMAL(1000),
	"details" varchar(2000));

--INSERT INTO "log_entry" ("user_id", "latitude", "longitude", "details")
--VALUES (1, 44.97443544637816, -93.2562070397675, 'a mushroom that has holes in it'),
--(1, 44.959382006981784, -93.27825928801052, 'gilled and smelled like black licorice'),
--(1, 44.977872673280686, -93.26405430900489, 'red top with white spots, white hollow stalk');

CREATE TABLE "mushroom_names" (
	"id" SERIAL PRIMARY KEY,
	"log_id" integer REFERENCES "log_entry" NOT NULL,
	"common_name" varchar(500),
	"scientific_name" varchar(255));

CREATE TABLE "mushroom_pictures" (
	"id" SERIAL PRIMARY KEY,
	"log_entry_id" integer REFERENCES "log_entry" NOT NULL,
	"user_id" integer REFERENCES "user" NOT NULL,
	"mushroom_picture_url" varchar(1000));
