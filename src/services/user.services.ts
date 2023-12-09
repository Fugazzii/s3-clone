import { Err, Ok } from "@sniptt/monads";
import fs from "node:fs";
import { complement, concat, ifElse, isNil, join, pipe, prop, useWith } from "ramda";

const STORAGE_DIR = "storage";

const validateUserPayload = pipe(
	prop("username"),
	complement(isNil),
	ifElse(
		isNil,
		() => Err("Username is required"),
		() => Ok(null)
	)
);

const userExists = pipe(
	prop("username"),
	join("/"),
	concat(STORAGE_DIR),
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
