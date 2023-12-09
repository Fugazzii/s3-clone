import express from "express";
import cors from "cors";
import { MainRouter } from "@routers";
import { Options } from "@constants";
import { log } from "console";

function main(port: number, host: string) {
	const app = express();

	app.use(cors(Options.corsOptions));
	app.use(express.json(Options.expressJsonOptions));

	const router = MainRouter.init();

	app.use("/", router);

	app.listen(port, host, () => log(`🚀 Server is listening on http://${host}:${port}`));
}

main(3000, "127.0.0.1");