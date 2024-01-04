import { pipe } from "ramda";
import { db } from "@common";
import { CreateBucketInput } from "../types/create-bucket.input";
import { createEntity } from "./base";

export const selectBucketNameCount = pipe(
	//! Vulnerable to sql injections
	(name: string) => db.prepare(`SELECT COUNT(name) FROM buckets WHERE name = ${name}`),
	Number,
);

export const createBucket = createEntity<CreateBucketInput>("buckets", ["name", "owner"]);