import { IException } from "..";
import ErrorMessages from "../messages";

export class DuplicateRecordException extends IException {
	public constructor() {
		super(ErrorMessages.DuplicateBucketName);
	}
}