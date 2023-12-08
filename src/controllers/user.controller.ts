import { Ok, Result } from "@sniptt/monads";
import { User } from "../types";
import { randomUUID } from "crypto";
import { userExists, validateUserPayload } from "../utils";

export const handleNewUser = (
	newUser: Omit<User, "id">
): User => {

	const result: Result<User, Error> = validateUserPayload(newUser)
		.andThen<boolean>(() => userExists(newUser.username))
		.map<User>(() => {
			return {
				...newUser,
				id: randomUUID(),
			} as User;
		});

	const addedUser = result.unwrapOrElse((err: Error) => {
		throw err;
	});

	return addedUser;
};

export const authorizeOwner = (
	token: string,
	owner: User
): Result<boolean, Error> => {
	return Ok(true);
};