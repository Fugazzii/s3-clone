import { Bucket } from "@core/domain";

export type CreateBucketInput = Omit<Bucket, "id">;