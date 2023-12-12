import { both, ifElse, pipe, prop, propSatisfies } from "ramda";
import { BucketRepository } from "@repositories";
import { CreateBucketDto } from "@dtos";
import { Err, Ok, Result } from "@sniptt/monads";
import { handleResult } from "@utils";

export const validatePayload = pipe(
	(createBucketDto: CreateBucketDto) => ({
		owner_id: createBucketDto.owner_id,
		name: createBucketDto.name,
	}),
	ifElse(
		both(
			propSatisfies((value: string) => value.length !== 0, "owner"),
			propSatisfies((value: string) => value.length !== 0, "name")
		),
		(validDto: CreateBucketDto) => Ok(validDto),
		() => Err("Invalid input")
	)
);
export const isMoreThanOne = (count: number) => count > 0 ? Ok(null) : Err("Bucket name already exists");

export const hasUniqueName = pipe(
	(createBucketDto: CreateBucketDto) => ({ dto: createBucketDto }),
	({ dto }) => ({
		dto,
		isUnique: BucketRepository.selectBucketNameCount(dto.name) <= 0,
	}),
	(result) => (result.isUnique ? Ok(result.dto) : Err("Bucket name already exists"))
);


export const create = pipe(
	validatePayload as (createBucketDto: CreateBucketDto) => Result<CreateBucketDto, string>,
	handleResult as (result: Result<CreateBucketDto, string>) => CreateBucketDto,
	hasUniqueName as (obj: CreateBucketDto) => Result<CreateBucketDto, string>,
	handleResult as (result: Result<CreateBucketDto, string>) => CreateBucketDto,
	BucketRepository.createBucket
);