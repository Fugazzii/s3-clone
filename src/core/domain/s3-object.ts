import { Bucket } from "./bucket";

export type S3Object = {
	id: number;
	name: string;
	bucket: Bucket;
};