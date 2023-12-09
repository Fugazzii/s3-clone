import { Router } from "express";
import { pipe, always } from "ramda";
import { UserController } from "@controllers";
import { routerOptions } from "../constants/other";

const createUserRoute = (router: Router) => router.post("/user", UserController.createUserHandler);

export const init = pipe(
	always(Router(routerOptions)),
	createUserRoute
);