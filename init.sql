BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

  CREATE TABLE IF NOT EXISTS "users" (
    "id" integer PRIMARY KEY,
    "username" varchar(512) UNIQUE NOT NULL,
    "email" varchar(512) UNIQUE NOT NULL,
    "password" varchar(512) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "buckets" (
    "id" integer PRIMARY KEY,
    "name" varchar(512) UNIQUE NOT NULL,
    "owner_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "s3_objects" (
    "id" integer PRIMARY KEY,
    "name" varchar(512) NOT NULL,
    "bucket_id" integer NOT NULL
  );

  ALTER TABLE "s3_objects"
    ADD CONSTRAINT IF NOT EXISTS fk_s3_objects_bucket_id
    FOREIGN KEY ("bucket_id") REFERENCES "buckets" ("id");

  ALTER TABLE "buckets"
    ADD CONSTRAINT IF NOT EXISTS fk_buckets_owner_id
    FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

  CREATE INDEX IF NOT EXISTS idx_buckets_name ON "buckets" ("name");

COMMIT;