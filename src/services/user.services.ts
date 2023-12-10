import fs from "node:fs";
import path from "node:path";

import { Err, Ok, Result } from "@sniptt/monads";
import { pipe, tryCatch } from "ramda";
import { UserRepository } from "@repositories";
import { CreateUserDto } from "@dtos";
import { handleResult } from "@utils";

const STORAGE_DIR = "storage";

const joinStorageDir = (p: string): string => path.join(STORAGE_DIR, p);

const userExists = (username: string): boolean => fs.existsSync(joinStorageDir(username));

const validateUserPayload = (dto: CreateUserDto): Result<CreateUserDto, string> =>
	dto.username ? Ok(dto) : Err("Username is required");

const createUserFolderIfExists = (dto: CreateUserDto): Result<CreateUserDto, string> => {
	const exists = userExists(dto.username);

	return exists
		? Err(`User folder already exists for ${dto.username}`)
		: tryCatch<() => Result<CreateUserDto, never>, Result<never, string>>(
			() => {
				fs.mkdirSync(joinStorageDir(dto.username), { recursive: true });
				return Ok(dto);
			},
			(err: unknown) => Err(`Could not create file ${err}`)
		)();
};

const create = pipe(
	validateUserPayload,
	handleResult,
	createUserFolderIfExists,
	(result: Result<CreateUserDto, string>) => {
		const data = result.unwrap();
		UserRepository.create(data);
		return result;
	}
);

export {
	userExists,
	validateUserPayload,
	createUserFolderIfExists,
	create
};