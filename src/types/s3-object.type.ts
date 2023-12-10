import { Bucket } from "./bucket.type";

export type S3Object = {
	id: number;
	name: string;
	bucket: Bucket;
};

export type S3ObjectModel = {
	id: number;
	name: string;
	bucket_id: number;
};