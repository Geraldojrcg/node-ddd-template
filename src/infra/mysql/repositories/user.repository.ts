import { DatabaseTags } from '@/config/di-tags/database.tags';
import { User } from '@/domain/user/entities/user';
import { UserRepositoryInterface } from '@/data/user/contracts/user-repository.interface';
import { inject, injectable } from 'inversify';
import { Connection, RowDataPacket } from 'mysql2/promise';

@injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @inject(DatabaseTags.Connection) private readonly conn: Connection,
  ) {}

  async findAll(): Promise<User[]> {
    const [rows] = await this.conn.query('SELECT * FROM users;');
    return (rows as RowDataPacket[]).map(
      (res) =>
        new User({
          id: res.id,
          name: res.name,
          email: res.email,
        }),
    );
  }

  async find(id: string): Promise<User> {
    const [rows] = await this.conn.query('SELECT * FROM users WHERE id = ?;', [
      id,
    ]);
    const response = rows[0];
    return new User({
      id: response.id,
      name: response.name,
      email: response.email,
    });
  }

  async create(user: User): Promise<void> {
    await this.conn.execute('INSERT INTO users (name, email) VALUES (?, ?);', [
      user.name,
      user.email,
    ]);
  }

  async update(entity: User): Promise<void> {
    await this.conn.execute(
      `UPDATE users 
      SET name = ?, email = ?
      WHERE id = ?;`,
      [entity.name, entity.email, entity.id],
    );
  }
}
