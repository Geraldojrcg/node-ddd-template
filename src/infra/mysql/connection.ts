import type { Connection } from 'mysql2/promise';
import * as mysql from 'mysql2/promise';

export async function createMySqlConnection(): Promise<Connection> {
  try {
    const connection = await mysql.createConnection({
      host: 'db',
      user: 'root',
      password: '123',
      database: 'test',
    });
    return connection;
  } catch (error) {
    console.log('Unable to connect to database', error);
  }
}
