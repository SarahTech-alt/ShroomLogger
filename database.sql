
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"date_created" timestamp NOT NULL DEFAULT NOW(),
	"profile_picture_medium" varchar(100) DEFAULT 'https://unsplash.com/photos/p7h0wkbtAQ0',
	"profile_picture_thumb" varchar(100) DEFAULT 'https://unsplash.com/photos/p7h0wkbtAQ0',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "log_entry" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"mushroom_names_id" integer,
	"date" TIMESTAMP NOT NULL DEFAULT NOW(),
	"latitude" DECIMAL,
	"longitude" DECIMAL(1000),
	"mushroom_pictures" integer,
	"details" varchar(2000),
	CONSTRAINT "log_entry_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

--INSERT INTO "log_entry" ("user_id", "latitude", "longitude", "details")
--VALUES (1, 44.97443544637816, -93.2562070397675, 'a mushroom that has holes in it'),
--(1, 44.959382006981784, -93.27825928801052, 'gilled and smelled like black licorice'),
--(1, 44.977872673280686, -93.26405430900489, 'red top with white spots, white hollow stalk');

CREATE TABLE "mushroom_names" (
	"id" serial NOT NULL,
	"common_name" varchar(500),
	"scientific_name" varchar(255),
	CONSTRAINT "mushroom_names_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "mushroom_pictures" (
	"id" serial NOT NULL,
	"log_entry_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"mushroom_picture_url" varchar(1000),
	CONSTRAINT "mushroom_pictures_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "log_entry" ADD CONSTRAINT "log_entry_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "log_entry" ADD CONSTRAINT "log_entry_fk1" FOREIGN KEY ("mushroom_names_id") REFERENCES "mushroom_names"("id");
ALTER TABLE "log_entry" ADD CONSTRAINT "log_entry_fk2" FOREIGN KEY ("mushroom_pictures") REFERENCES "mushroom_pictures"("id");
ALTER TABLE "mushroom_pictures" ADD CONSTRAINT "mushroom_pictures_fk0" FOREIGN KEY ("log_entry_id") REFERENCES "log_entry"("id");
ALTER TABLE "mushroom_pictures" ADD CONSTRAINT "mushroom_pictures_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");