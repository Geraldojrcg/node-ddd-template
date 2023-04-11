import {
  useExpressServer,
  getMetadataArgsStorage,
  useContainer,
} from 'routing-controllers';
import { Container } from 'inversify';
import * as express from 'express';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import { routingControllersToSpec } from 'routing-controllers-openapi';

import { mysqlContainer } from '../inversify/containers/mysql.container';
import { userContainer } from '../inversify/containers/user.container';
import { InversifyAdapter } from './adapters/inversify.adapter';
import { UserController } from './resources/user/user.controller';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

const app = express();

app.use(helmet());

const storage = getMetadataArgsStorage();

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const swaggerDocument = routingControllersToSpec(
  storage,
  {},
  {
    components: { schemas: schemas as any },
    info: { title: 'My app', version: '1.0.0' },
  },
);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const container = new Container();
container.load(mysqlContainer, userContainer);

const inversifyAdapter = new InversifyAdapter(container);
useContainer(inversifyAdapter);

useExpressServer(app, {
  classTransformer: true,
  controllers: [UserController],
});

app.listen(3000, () => console.log('application listening on port: 3000'));
