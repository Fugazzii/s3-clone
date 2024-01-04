import { Ok, Err } from "@sniptt/monads";
import { CreateBucketInput } from "../types/create-bucket.input";

export const exists = (count: number) => count > 0 ? Ok(null) : Err("Bucket name already exists");

export const hasUniqueName = async (
	createBucketDto: CreateBucketInput
) => {
	//! HARDCODED
	const bucketCount = 0;

	const result = {
		dto: createBucketDto,
		isUnique: exists(bucketCount),
	};

	return result.isUnique ? Ok(result.dto) : Err("Bucket name already exists");
};