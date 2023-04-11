import { User } from '../entities/user';

export type CreateUserParams = {
  name: string;
  email: string;
};

export interface CreateUserUseCaseInterface {
  execute(params: CreateUserParams): Promise<User>;
}
