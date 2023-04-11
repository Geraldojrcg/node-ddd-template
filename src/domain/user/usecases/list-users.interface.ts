import { User } from '../entities/user';

export interface ListUsersUserUseCaseInterface {
  execute(): Promise<User[]>;
}
