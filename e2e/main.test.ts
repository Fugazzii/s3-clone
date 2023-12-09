import { CreateUserDto } from "@dtos";
import { describe, expect, test } from "bun:test";

describe("e2e tests", () => {

	const mockCreateUserData: CreateUserDto = {
		email: "mgeli@xrova.com",
		password: "ymuili",
		username: "wolf"
	};

	test("create_new_user (should success)", async () => {
		const response = await fetch("http://127.0.0.1:3000/user", {
			method: "POST",
			body: JSON.stringify(mockCreateUserData),
			headers: { "Content-Type": "application/json" },
		});

		const body = await response.json();

		expect(body).toBeDefined();
	});

});