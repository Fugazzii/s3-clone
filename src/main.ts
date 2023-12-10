import express from "express";
import cors from "cors";
import { UserRouter } from "@routers";
import { Options } from "@constants";
import { log } from "console";

function main(port: number, host: string) {
	const app = express();

	app.use(cors(Options.corsOptions));
	app.use(express.json(Options.expressJsonOptions));

	const userRouter = UserRouter.init();

	app.use("/", userRouter);

	app.listen(port, host, () => log(`🚀 Server is listening on http://${host}:${port}`));
}

main(3000, "127.0.0.1");