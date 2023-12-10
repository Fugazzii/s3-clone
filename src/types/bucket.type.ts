import { User } from "./user.type";

export type Bucket = {
	id: number;
	owner: User;
	name: string;
};

export type BuckerModel = {
	id: number;
	owner_id: number;
	name: string;
};