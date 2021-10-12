
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"date_created" TIMESTAMP,
	"profile_picture" varchar(100),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "log_entry" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"mushroom_names_id" integer,
	"date" TIMESTAMP NOT NULL,
	"latitude" DECIMAL,
	"longitude" DECIMAL(1000),
	"mushroom_pictures" integer,
	"details" varchar(2000),
	CONSTRAINT "log_entry_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

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