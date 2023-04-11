import { Body, Get, JsonController, Post } from 'routing-controllers';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { ListUsersUserUseCaseInterface } from '@/domain/user/usecases/list-users.interface';
import { CreateUserUseCaseInterface } from '@/domain/user/usecases/create-user.interface';
import { inject, injectable } from 'inversify';
import { UserTags } from '@/config/di-tags/user.tags';
import { ResponseSchema } from 'routing-controllers-openapi';

@injectable()
@JsonController('/users')
export class UserController {
  constructor(
    @inject(UserTags.ListUsersService)
    private readonly listUsersUsecase: ListUsersUserUseCaseInterface,
    @inject(UserTags.CreateUserService)
    private readonly createUserUsecase: CreateUserUseCaseInterface,
  ) {}

  @Get()
  @ResponseSchema(UserDto, { isArray: true })
  async findAll(): Promise<UserDto[]> {
    const users = await this.listUsersUsecase.execute();
    return users.map((u) => ({ id: u.id, name: u.name, email: u.email }));
  }

  @Post()
  @ResponseSchema(UserDto)
  async create(
    @Body({ validate: true }) body: CreateUserDto,
  ): Promise<UserDto> {
    const user = await this.createUserUsecase.execute(body);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
