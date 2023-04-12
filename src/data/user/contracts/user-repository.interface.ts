import { BaseRepositoryInterface } from '@/domain/@shared/repositories/base-repository.interface';
import { User } from '@/domain/user/entities/user';

export interface UserRepositoryInterface
  extends BaseRepositoryInterface<User> {}
