import { User } from "@core/domain";

export type CreateUserDto = Omit<User, "id">;