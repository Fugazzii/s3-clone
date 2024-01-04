import { User } from "@core/domain";

export type CreateUserInput = Omit<User, "id">;