import { randomUUID } from "node:crypto";
import { Ok, Result } from "@sniptt/monads";
import { NextFunction, Request, Response } from "express";
import { User, ResponseObject, Success, Failure } from "../types";
import { createUser } from "../services";

export const newUserController = (
	req: Request,
	res: Response,
	_next: NextFunction
): Response<ResponseObject<User, unknown>> => {
	const createUserDto: Omit<User, "id"> = req.body;

	const result: Result<User, unknown> = createUser(createUserDto);

	const response = result.match<ResponseObject<User, unknown>>({
		ok: (data: User) => Success<User>(data, ""),
		err: (error: unknown) => Failure<unknown>(error, "")
	});

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