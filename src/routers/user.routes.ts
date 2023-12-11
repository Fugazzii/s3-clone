import { Router } from "express";
import { pipe, always } from "ramda";
import { UserController } from "@controllers";
import { Options } from "@constants";

const pingRoute = (router: Router) => router.get("/ping", UserController.ping);
const createUserRoute = (router: Router) => router.post("/user", UserController.create);

export const init = pipe(
	always(Router(Options.routerOptions)),
	createUserRoute,
	pingRoute
);
