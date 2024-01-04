import { Ok, Err } from "@sniptt/monads";
import { pipe, ifElse, both, propSatisfies } from "ramda";
import { CreateBucketInput } from "../types/create-bucket.input";

export const validatePayload = pipe(
	(createBucketDto: CreateBucketInput) => ({
		owner: createBucketDto.owner,
		name: createBucketDto.name,
	}),
	ifElse(
		both(
			propSatisfies((value: string) => value.length !== 0, "owner"),
			propSatisfies((value: string) => value.length !== 0, "name")
		),
		(validDto: CreateBucketInput) => Ok(validDto),
		() => Err("Invalid input")
	)
);