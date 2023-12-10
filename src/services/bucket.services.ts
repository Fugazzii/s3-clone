import { both, ifElse, isNil, pipe, prop, propSatisfies } from "ramda";
import { BucketRepository } from "@repositories";
import { CreateBucketDto } from "@dtos";
import { Err, Ok } from "@sniptt/monads";
import { handleResult } from "@utils";

const validatePayload = pipe(
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

const hasUniqueName = pipe(
	prop("name"),
	BucketRepository.selectBucketNameCount,
	isMoreThanOne
);

const create = pipe(
	validatePayload,
	handleResult,
	hasUniqueName,
	handleResult
);

export {
	validatePayload,
	hasUniqueName,
	create
};