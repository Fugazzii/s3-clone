import { User } from "../types";

export type CreateUserDto = Omit<User, "id">;