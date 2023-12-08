import { Result } from "@sniptt/monads";
import { Bucket } from "../types";
import { createBucket, hasUniqueName, validateBucketPayload } from "../utils/bucket.utils";
import { authorizeOwner } from "./user.handler";

export const handleNewBucket = (
	token: string,
	newBucketOptions: Omit<Bucket, "id">
): Bucket => {

	const result: Result<Bucket, unknown> = validateBucketPayload(newBucketOptions)
		.andThen<boolean>(() => authorizeOwner(token, newBucketOptions.owner))
		.andThen<boolean>(() => hasUniqueName(newBucketOptions.name))
		.andThen<Bucket>(() => createBucket(newBucketOptions));

	const createdBucket = result.unwrapOrElse((err) => {
		throw err;
	});

	return createdBucket;

};