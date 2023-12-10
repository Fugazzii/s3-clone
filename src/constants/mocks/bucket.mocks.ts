import { CreateBucketDto } from "@dtos";
import { UserMocks } from ".";
import { Bucket } from "@types";

export const someBucket: Bucket = {
	id: 0,
	name: "bucket-name-senaki",
	owner: UserMocks.someUser
};

export const createbucketDto: CreateBucketDto = {
	name: someBucket.name,
	owner: someBucket.owner
};

export const invalidCreatebucketDto: CreateBucketDto = {
	name: "",
	owner: someBucket.owner
};