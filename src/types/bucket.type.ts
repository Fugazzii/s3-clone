import { User } from "./user.type";

export type Bucket = {
	id: number;
	owner: User;
	name: string;
};

export type BucketModel = {
	id: number;
	owner_id: number;
	name: string;
};