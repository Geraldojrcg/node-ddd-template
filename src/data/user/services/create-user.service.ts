import { inject, injectable } from 'inversify';

import { User } from '@/domain/user/entities/user';
import { UserRepositoryInterface } from '@/domain/user/repositories/user-repository.interface';
import {
  CreateUserParams,
  CreateUserUseCaseInterface,
} from '@/domain/user/usecases/create-user.interface';
import { UserTags } from '@/config/di-tags/user.tags';

@injectable()
export class CreateUserService implements CreateUserUseCaseInterface {
  constructor(
    @inject(UserTags.UserRepository)
    private readonly repository: UserRepositoryInterface,
  ) {}

  async execute({ name, email }: CreateUserParams): Promise<User> {
    const user = new User({ name, email });
    await this.repository.create(user);
    return user;
  }
}
