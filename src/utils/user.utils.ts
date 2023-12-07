import { Result, Err, Ok } from "@sniptt/monads";
import { User } from "../types";
import fs from "node:fs";
import path from "node:path";

const STORAGE_DIR = "storage";

export const validateUserPayload = (
	newUser: Omit<User, "id">
): Result<null, Error> => {
	if (!newUser.email) {
		return Err(new Error("Email is required"));
	}
	return Ok(null);
};

export const userExists = (username: string): Result<boolean, Error> => {
	try {
		const targetDir = path.join(STORAGE_DIR, username);
		const dirExists = fs.existsSync(targetDir);

		return Ok(dirExists);
	} catch (error) {
		throw Err(error);
	}
};

export const createUser = (newUser: Omit<User, "id">): Result<null, Error> => {
	try {
		const dir = path.join(STORAGE_DIR, newUser.username);
		fs.mkdirSync(dir, { recursive: true });

		return Ok(null);
	} catch (error) {
		throw Err(error);
	}
};