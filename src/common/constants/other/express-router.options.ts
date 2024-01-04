import { RouterOptions } from "express";

export const routerOptions: RouterOptions = Object.freeze({
	caseSensitive: false,
	mergeParams: true,
	strict: true
});