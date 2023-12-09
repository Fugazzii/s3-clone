import { Ok, Result } from "@sniptt/monads";
import { NextFunction, Request, Response } from "express";
import { User, ResponseObject, Success, Failure } from "../types";
import { createUser } from "@services";
import { CreateUserDto } from "@dtos";

export const createUserHandler = (
	req: Request,
	res: Response,
	_next: NextFunction
): Response<ResponseObject<User, unknown>> => {
	const createUserDto: CreateUserDto = req.body;

	let response: ResponseObject<string, unknown>;

	try {
		const result = createUser(createUserDto) as string;
		response = Success<string>(result, "");
	} catch (error) {
		response = Failure<unknown>(error, "");
	}

	return res
		.type("application/json")
		.status(201)
		.json(response);
};

export const authorizeOwner = (
	token: string,
	owner: User
): Result<boolean, Error> => {
	return Ok(true);
};