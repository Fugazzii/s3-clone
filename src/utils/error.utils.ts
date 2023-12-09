export const panic = (error: unknown): never => {
	const msg = error instanceof Error ? error.message : "Unknown error";
	throw new Error(msg);
};