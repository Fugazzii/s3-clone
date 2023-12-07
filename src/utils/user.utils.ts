import { Result, Err, Ok } from "@sniptt/monads";
import { User } from "../types";

export const validateUserPayload = (newUser: Omit<User, "id">): Result<null, string> => {
	if (!newUser.email) {
		return Err("Email is required");
	}
	return Ok(null);
};

export const userExists = (email: string): Result<boolean, string> => {
	return Ok(true);
};