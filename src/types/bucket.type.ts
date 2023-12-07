import { User } from "./user.type";

export type Bucket = {
	id: string;
	owner: User;
	name: string;
};