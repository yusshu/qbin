import StorageService from './storage.service';
import Bin, { BinProperties } from '../../model/bin.model';
import Agenda from 'agenda';
import config from '../../config';
import { model, Schema, Model } from 'mongoose';

export default class MongoStorageService implements StorageService {

  private readonly BinModel: Model<any>;
  private readonly agenda: Agenda;

  constructor() {
    this.BinModel = model(
      'bin',
      new Schema(BinProperties)
    );
    this.agenda = new Agenda();
    this.agenda.mongo(this.BinModel.db.db, 'jobs');
    this.agenda.processEvery(config.processEvery);
    this.agenda.define('delete bin', async (job, done) => {
      let _id: string = job.attrs.data.bin;
      console.log(`[INFO] Removing paste with id ${_id}`);
      await this.BinModel.deleteOne({ _id });
      await job.remove();
      done();
    });
    this.agenda.start()
      .catch(console.error);
  }

  find(id: string): Promise<Bin> {
    return this.BinModel.findOne({
      _id: id
    }).then(document => document as Bin);
  }

  list(time: number): Promise<Bin[]> {
    return this.BinModel.find({
      createdAt: {
        $gte: new Date(Date.now() - time)
      }
    }).then(documents => documents as Bin[]);
  }

  save(bin: Bin): Promise<void> {
    console.log(`[INFO] New paste stored with id ${bin._id}`);
    this.agenda.schedule(new Date(Date.now() + config.binRetain), 'delete bin', {
      bin: bin._id
    }).catch(console.error);
    return new this.BinModel(bin).save();
  }

}
