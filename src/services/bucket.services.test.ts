import { describe, expect, test } from "bun:test";
import { BucketService } from "@services";
import { BucketMocks } from "@constants";

describe("Bucket Services", () => {

	test("validate_create_bucket_dto (should not fail)", () => {
		const res = BucketService.validatePayload(BucketMocks.createbucketDto);
		const data = res.unwrap();

		expect(res.isOk()).toBe(true);
		expect(data).toStrictEqual(BucketMocks.createbucketDto);
	});

	test("validate_create_bucket_dto (should fail)", () => {
		const res = BucketService.validatePayload(BucketMocks.invalidCreatebucketDto);
		const err = res.unwrapErr();

		expect(res.isErr()).toBe(true);
		expect(err).toBe("Invalid input");
	});

	test("check_unique_name (should exist)", () => {
		const res = BucketService.hasUniqueName(BucketMocks.createbucketDto.name);
		const data = res.unwrap();

		expect(res.isOk()).toBe(true);
		expect(data).toBe(null);
	});

	test("check_unique_name (should not exist)", () => {
		const res = BucketService.hasUniqueName(BucketMocks.invalidCreatebucketDto.name);
		const err = res.unwrapErr();

		expect(res.isErr()).toBe(true);
		expect(err).toBe("Bucket name already exists");
	});

});