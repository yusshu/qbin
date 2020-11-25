import { Application } from 'express';
import StorageService, { createFromConfig } from '../service/storage/storage.service';
import ServiceModule from '../app.module';

import setupMiddlewares from './middleware.loader';
import setupRoutes from './server.routing';

export default async (app: Application) => {
  let module: ServiceModule<StorageService> = createFromConfig();
  for (let load of module.loaders) {
    await load(app);
  }
  let storage = module.service();
  setupMiddlewares(app);
  setupRoutes(app, storage);
};
