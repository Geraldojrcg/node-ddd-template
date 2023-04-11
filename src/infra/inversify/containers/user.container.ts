import { UserTags } from '@/config/di-tags/user.tags';
import { CreateUserService } from '@/data/user/services/create-user.service';
import { ListUsersService } from '@/data/user/services/list-users.service';
import { UserRepositoryInterface } from '@/domain/user/repositories/user-repository.interface';
import { CreateUserUseCaseInterface } from '@/domain/user/usecases/create-user.interface';
import { ListUsersUserUseCaseInterface } from '@/domain/user/usecases/list-users.interface';
import { UserRepository } from '@/infra/mysql/repositories/user.repository';
import { ContainerModule, interfaces } from 'inversify';

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepositoryInterface>(UserTags.UserRepository).to(UserRepository);
  bind<ListUsersUserUseCaseInterface>(UserTags.ListUsersService).to(
    ListUsersService,
  );
  bind<CreateUserUseCaseInterface>(UserTags.CreateUserService).to(
    CreateUserService,
  );
});
