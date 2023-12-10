import { both, ifElse, isNil, pipe, prop, propSatisfies } from "ramda";
import { BucketRepository } from "@repositories";
import { CreateBucketDto } from "@dtos";
import { Err, Ok, Result } from "@sniptt/monads";

export const validatePayload = pipe(
	(createBucketDto: CreateBucketDto) => ({
		owner: createBucketDto.owner,
		name: createBucketDto.name,
	}),
	ifElse(
		both(
			propSatisfies((value: CreateBucketDto) => !isNil(value), "owner"),
			propSatisfies((value: CreateBucketDto) => !isNil(value), "name")
		),
		(validDto: CreateBucketDto) => Ok(validDto),
		() => Err("Invalid input")
	)
);

const isMoreThanOne = (count: number) => count > 0 ? Ok(null) : Err("Bucket name already exists");

const handleResult = (
	res: Result<unknown, unknown>
): unknown => res.unwrapOrElse((err) => {
	throw err;
});

export const hasUniqueName = pipe(
	prop("name"),
	BucketRepository.selectBucketNameCount,
	isMoreThanOne
);

export const create = pipe(
	validatePayload,
	handleResult,
	hasUniqueName,
	handleResult
);