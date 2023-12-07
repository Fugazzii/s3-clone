import { Ok, Result } from "@sniptt/monads";
import { Bucket } from "../types";
import { createBucket, hasUniqueName, validateBucketPayload } from "../utils/bucket.utils";
import { authorizeOwner } from "./user.handler";

export const handleNewBucket = (
	token: string,
	newBucketOptions: Omit<Bucket, "id">
): Bucket => {

	const result: Result<Bucket, Error> = validateBucketPayload(newBucketOptions)
		.andThen(() => authorizeOwner(token, newBucketOptions.owner))
		.andThen(() => hasUniqueName(newBucketOptions.name))
		.andThen(() => createBucket(newBucketOptions));

	const createdBucket = result.unwrapOrElse((err) => {
		throw err;
	});

	return createdBucket;

};
