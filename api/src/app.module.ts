import { Application } from 'express';

export default interface ServiceModule<T> {

  readonly loaders: ((app: Application) => Promise<void>)[];

  readonly service: () => T;

}
