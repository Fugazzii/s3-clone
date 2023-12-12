import { BucketModel } from "../types";

export type CreateBucketDto = Omit<BucketModel, "id">;