import { CreateUserDto } from "@dtos";
import { createEntity } from "./base.repository";

export const createUser = createEntity<CreateUserDto>("users", ["email", "password", "username"]);
