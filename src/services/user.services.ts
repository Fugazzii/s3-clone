import { Err, Ok, Result } from "@sniptt/monads";
import fs from "node:fs";
import { complement, concat, ifElse, isNil, join, pipe, prop, tryCatch } from "ramda";

const STORAGE_DIR = "storage";

const validateUserPayload = pipe(
	prop("email"),
	complement(isNil),
	ifElse(
		isNil,
		() => Err("Email is required"),
		() => Ok(null)
	)
);

const userExists = pipe(
	join("/"),
	concat(STORAGE_DIR),
	tryCatch(
		(targetDir: string): Result<boolean, unknown> => Ok(fs.existsSync(targetDir)),
		(error: unknown): Result<boolean, unknown> => Err(error)
	)
);

export const createUserFileInStorage = pipe(
	join("/"),
	concat(STORAGE_DIR),
	tryCatch(
		(dir: string): Result<undefined, unknown> => {
			fs.mkdirSync(dir, { recursive: true });
			return Ok(undefined);
		},
		(error: unknown): Result<undefined, unknown> => Err(error)
	)
);


const handleError = (data: Result<any, any>) => {
	if (data.isErr()) {
		throw new Error(data.unwrapOr("Failed"));
	}
	return data.unwrap();
};

export const createUser = pipe(
	validateUserPayload,
	handleError,
	userExists,
	handleError,
	createUserFileInStorage,
	handleError
);
