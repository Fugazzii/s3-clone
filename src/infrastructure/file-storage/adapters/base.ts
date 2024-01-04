import { pipe, tryCatch } from "ramda";
import { Err, Ok, Result } from "@sniptt/monads";
import { db } from "@common";

const insertEntity = (table: string, columns: string[], values: Array<string | number>) =>
	db.run(`INSERT INTO ${table} (${columns.join(", ")}) VALUES (${Array(columns.length).fill("?").join(", ")})`, values);

export const createEntity = <T>(table: string, columns: Array<keyof T>) =>
	pipe(
		tryCatch(
			(dto: T) => Ok(insertEntity(
				table,
				columns as string[],
				columns.map((col) => dto[col] as string))
			),
			(error: unknown) => {
				console.error(error);
				return Err(`Error has occurred while creating entity ${error}`);
			}
		),
		(res: Result<void, unknown>) => res.unwrapOrElse((err: unknown) => {
			throw err;
		})
	);
