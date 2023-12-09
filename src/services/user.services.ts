import { Err, Ok } from "@sniptt/monads";
import fs from "node:fs";
import { concat, ifElse, isNil, join, pipe, prop, useWith } from "ramda";
import path from "path";

const STORAGE_DIR = "storage";

export const validateUserPayload = pipe(
	prop("username"),
	ifElse(
		isNil,
		() => Err(false),
		() => Ok(true)
	)
);

export const userExists = pipe(
	prop("username"),
	(username: string) => path.join(STORAGE_DIR, username),
	useWith(fs.existsSync, [String])
);

export const createUserFileInStorage = pipe(
	prop("username"),
	join("/"),
	concat(STORAGE_DIR),
	useWith(fs.mkdirSync, [String])
);

export const createUser = pipe(
	validateUserPayload,
	userExists,
	createUserFileInStorage
);
