import { Bucket } from "../types";

export type CreateBucketDto = Omit<Bucket, "id">;