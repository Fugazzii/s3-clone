import { UserModel } from "@types";

export type CreateUserDto = Omit<UserModel, "id">;