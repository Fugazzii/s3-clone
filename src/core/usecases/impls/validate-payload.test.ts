import { describe, expect, test } from "bun:test";
import { BucketMocks } from "@common";
import { validatePayload } from "./validate-payload";

describe("Validate Payload", () => {

	test("validate_create_bucket_dto (should not fail)", () => {
		const res = validatePayload(BucketMocks.createbucketDto);
		const data = res.unwrap();

		expect(res.isOk()).toBe(true);
		expect(data).toStrictEqual(BucketMocks.createbucketDto);
	});

	test("validate_create_bucket_dto (should fail)", () => {
		const res = validatePayload(BucketMocks.invalidCreatebucketDto);
		expect(res.isErr()).toBe(true);

		const err = res.unwrapErr();
		expect(err).toBe("Invalid input");
	});

});