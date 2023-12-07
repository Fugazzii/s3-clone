export type User = {
	id: string;
	email: string;
	password: string;
	username: string;
};

export type TokenPayload = {
	id: string;
};