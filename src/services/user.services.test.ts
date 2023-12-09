import { describe, expect, test } from "bun:test";
import { CreateUserDto } from "../dtos/user.dtos";
import { userExists, validateUserPayload } from "./user.services";

describe("Test service", () => {

	const mockCreateUserData: CreateUserDto = {
		email: "mgeli@xrova.com",
		password: "ymuili",
		username: "wolf"
	};

	test("Testing validating user", () => {
		const actualResult = validateUserPayload(mockCreateUserData);
		expect(actualResult.isErr()).toEqual(false);
		expect(actualResult.unwrap()).toEqual(true);
	});

	test("Testing validating user with missing username", () => {
		const badRequest = { ...mockCreateUserData, username: null };
		const actualResult = validateUserPayload(badRequest);
		expect(actualResult.isErr()).toEqual(true);
		expect(actualResult.unwrapErr()).toEqual(false);
	});

	test("Testing userExists function", () => {
		const result = userExists(mockCreateUserData);
		expect(result).toBe(true);
	});

	test("Testing userExists function failure", () => {
		const badRequest = { ...mockCreateUserData, username: "fakename" };
		const result = userExists(badRequest);
		expect(result).toBe(false);
	});
});