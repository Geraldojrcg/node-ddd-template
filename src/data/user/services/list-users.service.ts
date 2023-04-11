import { inject, injectable } from 'inversify';

import { User } from '@/domain/user/entities/user';
import { UserRepositoryInterface } from '@/domain/user/repositories/user-repository.interface';
import { ListUsersUserUseCaseInterface } from '@/domain/user/usecases/list-users.interface';
import { UserTags } from '@/config/di-tags/user.tags';

@injectable()
export class ListUsersService implements ListUsersUserUseCaseInterface {
  constructor(
    @inject(UserTags.UserRepository)
    private readonly repository: UserRepositoryInterface,
  ) {}

  execute(): Promise<User[]> {
    return this.repository.findAll();
  }
}
