import fs from "node:fs";
import path from "node:path";

import { Err, Ok, Result } from "@sniptt/monads";
import { ifElse, isNil, pipe, prop, tryCatch, useWith } from "ramda";

const STORAGE_DIR = "storage";

export const validateUserPayload = pipe(
	prop("username"),
	ifElse(
		isNil,
		() => Err(""),
		Ok
	)
);

export const userExists = pipe(
	(username: string) => path.join(STORAGE_DIR, username),
	useWith(fs.existsSync, [String])
);

export const createUserFolder = pipe(
	(username: string) => path.join(STORAGE_DIR, username),
	(p: string) => fs.mkdirSync(p, { recursive: true })
);

export const createUser = pipe(
	validateUserPayload,
	(result: Result<unknown, unknown>) =>
		result.andThen((username: unknown) => {
			const handleUserExistence = tryCatch(
				() => userExists(username as string),
				() => false
			);

			const exists = handleUserExistence();
			if (exists) {
				return Err(`User folder already exists for ${result.unwrap()}`);
			}

			const handleFileCreation = tryCatch(
				() => Ok(createUserFolder(username as string) as string),
				(err: unknown) => Err(`Could not create file ${err}`)
			);

			return handleFileCreation();
		})
);