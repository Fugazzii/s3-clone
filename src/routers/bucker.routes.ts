import { Router } from "express";
import { pipe, always } from "ramda";
import { routerOptions } from "../constants/other";

const createBucketRoute = (router: Router) => router.post("/user", () => { });

export const init = pipe(
	always(Router(routerOptions)),
	createBucketRoute
);
