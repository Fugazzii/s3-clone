import { pipe } from "ramda";
import { db } from "@utils";

export const selectBucketNameCount = pipe(
	//! Vulnerable to sql injections
	(name: string) => db.prepare(`SELECT COUNT(name) FROM buckets WHERE name = ${name}`),
	Number,
);