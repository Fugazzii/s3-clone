import { Ok, Result } from "@sniptt/monads";
import { User } from "../types";
import { randomUUID } from "crypto";
import { userExists, validateUserPayload } from "../utils";

export const handleNewUser = (
	newUser: Omit<User, "id">
): Result<User, string> => {
	return validateUserPayload(newUser)
		.andThen(() => userExists(newUser.email))
		.map(() => {
			const user: User = {
				...newUser,
				id: randomUUID(),
			};
			return user;
		});
};

export const authorizeOwner = (
	token: string,
	owner: User
): Result<boolean, Error> => {
	return Ok(true);
};