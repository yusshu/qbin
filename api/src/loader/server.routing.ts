import setupBinRoute from '../route/bin.route';
import { Application } from 'express';
import StorageService from '../service/storage/storage.service';

export default (app: Application, storage: StorageService) => {
  setupBinRoute(app, storage);
}

