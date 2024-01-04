import { IBucketRepository } from "../ports/bucket.repository";

const create = (bucketRepo: IBucketRepository) => {
	throw new Error("unimplemented!");
};

export const BucketInterceptor = {
	create
};

export default BucketInterceptor;