import { describe, expect, test } from "bun:test";
import { CreateUserDto } from "../dtos/user.dtos";
import { userExists, validateUserPayload } from "./user.services";

describe("User Services", () => {

	const mockCreateUserData: CreateUserDto = {
		email: "mgeli@xrova.com",
		password: "ymuili",
		username: "wolf"
	};

	test("validating_user (should not fail)", () => {
		const actualResult = validateUserPayload(mockCreateUserData);
		expect(actualResult.isErr()).toEqual(false);
		expect(actualResult.unwrap()).toEqual(mockCreateUserData.username);
	});

	test("validating_user (should fail)", () => {
		const badRequest = { ...mockCreateUserData, username: null };
		const actualResult = validateUserPayload(badRequest);
		expect(actualResult.isErr()).toEqual(true);
		expect(actualResult.unwrapErr()).toEqual("");
	});

	test("check_user_existence (should exist)", () => {
		const result = userExists(mockCreateUserData.username);
		expect(result).toBe(true);
	});

	test("check_user_existence (should not exist)", () => {
		const result = userExists("new_wolf");
		expect(result).toBe(false);
	});

});