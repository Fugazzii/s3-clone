import { describe, expect, test } from "bun:test";
import { BucketMocks } from "@common";
import { validatePayload } from "../impls/validate-payload";
import { hasUniqueName } from "./has-unique-name";
import ErrorMessages from "../errors/messages";

describe("Bucket Services", () => {

	test("check_unique_name (should exist)", async () => {
		const res = await hasUniqueName(BucketMocks.createbucketDto);
		const data = res.unwrap();

		expect(res.isOk()).toBe(true);
		expect(data).toBe(BucketMocks.someBucket);
	});

	test("check_unique_name (should not exist)", async () => {
		const res = await hasUniqueName(BucketMocks.invalidCreatebucketDto);
		const err = res.unwrapErr();

		expect(res.isErr()).toBe(true);
		expect(err).toBe(ErrorMessages.DuplicateBucketName);
	});

});