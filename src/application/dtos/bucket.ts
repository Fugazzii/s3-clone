import type { Bucket } from "@core/domain";

export type CreateBucketDto = Omit<Bucket, "id">;