import { describe, expect, test } from "bun:test";
import { UserService } from "@services";
import { UserMocks } from "@constants";

describe("User Services", () => {

	test("validating_user (should not fail)", () => {
		const actualResult = UserService.validateUserPayload(UserMocks.createUserDto);
		expect(actualResult.isErr()).toEqual(false);
		expect(actualResult.unwrap()).toEqual(UserMocks.createUserDto.username);
	});

	test("validating_user (should fail)", () => {
		const actualResult = UserService.validateUserPayload(UserMocks.invalidCreateUserDto);
		expect(actualResult.isErr()).toEqual(true);
		expect(actualResult.unwrapErr()).toEqual("");
	});

	test("check_user_existence (should exist)", () => {
		const result = UserService.userExists(UserMocks.createUserDto.username);
		expect(result).toBe(true);
	});

	test("check_user_existence (should not exist)", () => {
		const result = UserService.userExists("new_wolf");
		expect(result).toBe(false);
	});

});