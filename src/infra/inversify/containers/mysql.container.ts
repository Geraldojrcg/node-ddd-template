import { ContainerModule, interfaces } from 'inversify';
import type { Connection } from 'mysql2/promise';

import { DatabaseTags } from '@/config/di-tags/database.tags';
import { createMySqlConnection } from '@/infra/mysql/connection';

export const mysqlContainer = new ContainerModule(
  async (bind: interfaces.Bind) => {
    const connection: Connection = await createMySqlConnection();

    bind<Connection>(DatabaseTags.Connection).toConstantValue(connection);
  },
);
