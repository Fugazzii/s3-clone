import { Bucket } from "./bucket.type";

export type S3Object<T> = {
	id: string;
	bucket: Bucket;
	data: T;
};