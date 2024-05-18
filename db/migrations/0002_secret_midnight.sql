DO $$ BEGIN
 CREATE TYPE "question_type" AS ENUM('simple', 'essay', 'select', 'fill_in_the_blank');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workbook_id" uuid NOT NULL,
	"content" text NOT NULL,
	"type" "question_type" DEFAULT 'simple' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"workbook_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workbook" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "question_workbook_id_index" ON "question" ("workbook_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "student_user_id_index" ON "student" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "student_workbook_id_index" ON "student" ("workbook_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workbook_user_id_index" ON "workbook" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_workbook_id_workbook_id_fk" FOREIGN KEY ("workbook_id") REFERENCES "workbook"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student" ADD CONSTRAINT "student_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student" ADD CONSTRAINT "student_workbook_id_workbook_id_fk" FOREIGN KEY ("workbook_id") REFERENCES "workbook"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workbook" ADD CONSTRAINT "workbook_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
