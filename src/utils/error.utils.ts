import { Result } from "@sniptt/monads";

export const handleResult = <S, E>(result: Result<S, E>) => {
	return result.unwrapOrElse((err: E) => {
		throw err;
	});
};

export const panic = (error: unknown): never => {
	const msg = error instanceof Error ? error.message : "Unknown error";
	throw new Error(msg);
};