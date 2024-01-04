import { UserMocks } from ".";
import { CreateBucketDto } from "../../../application/dtos";
import { Bucket } from "../../../core/domain/bucket";

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