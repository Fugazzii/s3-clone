import { pipe } from "ramda";
import { db } from "@utils";
import { CreateBucketDto } from "@dtos";
import { createEntity } from "./base.repository";

export const selectBucketNameCount = pipe(
	//! Vulnerable to sql injections
	(name: string) => db.prepare(`SELECT COUNT(name) FROM buckets WHERE name = ${name}`),
	Number,
);

export const createBucket = createEntity<CreateBucketDto>("buckets", ["name", "owner_id"]);