import { CreateUserInput } from "../types/create-user.input";
import { createEntity } from "./base";

export const createUser = createEntity<CreateUserInput>("users", ["email", "password", "username"]);
