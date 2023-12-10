import { CreateUserDto } from "@dtos";
import { User } from "@types";

export const someUser: User = {
	id: 0,
	email: "mgeli@xrova.com",
	password: "ymuili",
	username: "wolf"
};

export const createUserDto: CreateUserDto = {
	email: someUser.email,
	password: someUser.password,
	username: someUser.username
};

export const invalidCreateUserDto: CreateUserDto = {
	...createUserDto,
	username: ""
};