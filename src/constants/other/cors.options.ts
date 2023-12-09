import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = Object.freeze({
	origin: "*",
	methods: "*",
	allowedHeaders: "*",
	exposedHeaders: "*",
	credentials: true,
	maxAge: 86400,
	preflightContinue: false,
	optionsSuccessStatus: 204
});
