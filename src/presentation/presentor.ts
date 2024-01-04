export type SuccessResponse<S> = {
	success: true;
	message: string;
	data: S;
};

export type ErrorResponse<E> = {
	success: false;
	message: string;
	error: E;
};

export type ResponseObject<S, E> = SuccessResponse<S> | ErrorResponse<E>;

export const Success = <S>(
	data: S,
	message: string
): SuccessResponse<S> => {
	return {
		success: true,
		message,
		data
	};
};

export const Failure = <E>(
	error: E,
	message: string
): ErrorResponse<E> => {
	return {
		success: false,
		message,
		error
	};
};