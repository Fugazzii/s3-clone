BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "users" (
  "id" INTEGER PRIMARY KEY,
  "username" VARCHAR(512) UNIQUE NOT NULL,
  "email" VARCHAR(512) UNIQUE NOT NULL,
  "password" VARCHAR(512) NOT NULL
);

CREATE TABLE IF NOT EXISTS "buckets" (
  "id" INTEGER PRIMARY KEY,
  "name" VARCHAR(512) UNIQUE NOT NULL,
  "owner_id" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "s3_objects" (
  "id" INTEGER PRIMARY KEY,
  "name" VARCHAR(512) NOT NULL,
  "bucket_id" INTEGER NOT NULL
);

ALTER TABLE "s3_objects"
  ADD CONSTRAINT IF NOT EXISTS fk_s3_objects_bucket_id
  FOREIGN KEY ("bucket_id") REFERENCES "buckets" ("id");

ALTER TABLE "buckets"
  ADD CONSTRAINT IF NOT EXISTS fk_buckets_owner_id
  FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

CREATE INDEX IF NOT EXISTS idx_buckets_name ON "buckets" ("name");

COMMIT;
