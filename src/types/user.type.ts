export type User = {
	id: number;
	email: string;
	password: string;
	username: string;
};

export type UserModel = User;

export type TokenPayload = {
	id: string;
};