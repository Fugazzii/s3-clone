import { Err, Ok, Result } from "@sniptt/monads";
import { Bucket } from "../types";
import { randomUUID } from "crypto";

export const createBucket = (
	newBucketOptions: Omit<Bucket, "id">
): Result<Bucket, unknown> => {
	try {
		return Ok({
			id: randomUUID(),
			...newBucketOptions
		});
	} catch (error) {
		return Err<Bucket, unknown>(error);
	}
};

export const hasUniqueName = (
	bucketName: string
): Result<boolean, unknown> => {
	return Ok(true);
};

export const validateBucketPayload = (
	newUser: Omit<Bucket, "id">
): Result<null, unknown> => {
	if (!newUser.name) {
		return Err(new Error("Name is required"));
	}
	return Ok(null);
};