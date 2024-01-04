import { User } from "./user";

export type Bucket = {
	id: number;
	owner: User;
	name: string;
};