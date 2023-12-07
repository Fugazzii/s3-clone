import { Err, Ok, Result } from "@sniptt/monads";
import { Bucket } from "../types";
import { randomUUID } from "crypto";

export const createBucket = (newBucketOptions: Omit<Bucket, "id">): Result<Bucket, Error> => {
	try {
		return Ok({
			id: randomUUID(),
			...newBucketOptions
		});
	} catch (error) {
		throw Err(error);
	}
};

export const hasUniqueName = (bucketName: string): Result<boolean, Error> => {
	return Ok(true);
};

export const validateBucketPayload = (newUser: Omit<Bucket, "id">): Result<null, Error> => {
	if (!newUser.name) {
		return Err(new Error("Name is required"));
	}
	return Ok(null);
};