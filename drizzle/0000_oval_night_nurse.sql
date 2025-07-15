CREATE TABLE "todo" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"is_completed" boolean NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
