import { Router } from "express";
import { pipe, always } from "ramda";
import { Options } from "@constants";

const createBucketRoute = (router: Router) => router.post("/user", () => { });

export const init = pipe(
	always(Router(Options.routerOptions)),
	createBucketRoute
);
