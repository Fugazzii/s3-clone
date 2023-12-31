import express from "express";
import cors from "cors";
import { log } from "console";

import { UserRouter, BucketRouter } from "./routers";
import { Options } from "@common";

function main(port: number, host: string) {
	const app = express();

	app.use(cors(Options.corsOptions));
	app.use(express.json(Options.expressJsonOptions));

	const userRouter = UserRouter.init();
	const bucketRouter = BucketRouter.init();

	app.use("/", userRouter);
	app.use("/", bucketRouter);

	app.listen(port, host, () => log(`🚀 Server is listening on http://${host}:${port}`));
}

main(3000, "127.0.0.1");