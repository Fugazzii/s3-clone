import { Ok, Result } from "@sniptt/monads";
import { NextFunction, Request, Response } from "express";
import { User, ResponseObject, Success, Failure } from "../types";
import { createUser } from "@services";
import { CreateUserDto } from "@dtos";

export const ping = (
	req: Request,
	res: Response,
	_next: NextFunction
): Response<ResponseObject<User, unknown>> => {
	const response = Success(true, "Pong");

	return res
		.type("application/json")
		.status(201)
		.json(response);
};

export const createUserHandler = (
	req: Request,
	res: Response,
	_next: NextFunction
): Response<ResponseObject<User, unknown>> => {
	const createUserDto: CreateUserDto = req.body;

	let response: ResponseObject<string, unknown>;

	try {
		const result = createUser(createUserDto);

		response = result.match<ResponseObject<string, unknown>>({
			ok: (data: unknown) => Success<string>(data as string, "Created user"),
			err: (error: unknown) => Failure<unknown>(error, "User already exists")
		});
	} catch (error) {
		response = Failure<unknown>(error, "Error in file operations");
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