import Bin from '../../model/bin.model';
import ServiceModule from '../../app.module';
import config from '../../config';
import MongoStorageService from './mongo.storage.service';
import connectMongo from './mongo.connection.loader';

export default interface StorageService {

  find(id: string): Promise<Bin>;

  save(bin: Bin): Promise<void>;

  list(time: number): Promise<Bin[]>;

}

export function createFromConfig(): ServiceModule<StorageService> {

  let module: ServiceModule<StorageService> = undefined;

  switch (config.storage.toLowerCase()) {

    case 'mongo': {
      module = {
        loaders: [connectMongo],
        service: () => new MongoStorageService()
      };
      break;
    }

  }

  if (module) {
    console.log(`[INFO] Using storage method type '${config.storage}'`);
    return module;
  } else {
    throw new Error(`Invalid storage method type '${config.storage}'`);
  }
}
