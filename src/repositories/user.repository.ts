import { pipe, tryCatch } from "ramda";
import { Result, Ok, Err } from "@sniptt/monads";
import { db } from "@utils";
import { CreateUserDto } from "@dtos";

const insertIntoDatabase = (createUserDto: CreateUserDto) =>
	db.run(
		"INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
		[createUserDto.email, createUserDto.password, createUserDto.username]
	);

const create = pipe(
	tryCatch(
		(dto: CreateUserDto) => Ok(insertIntoDatabase(dto)),
		(error) => Err(error)
	),
	(result: Result<unknown, unknown>) => result.unwrapOrElse((err) => {
		throw err;
	})
);

export {
	create
};