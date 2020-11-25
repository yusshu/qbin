import { Application } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import config from '../config';
import { generatePasteId } from '../service/bin.service';
import StorageService from '../service/storage/storage.service';
import Bin from '../model/bin.model';

export default (app: Application, storage: StorageService) => {

  app.post(
    '/create',
    celebrate({
      [Segments.BODY]: {
        data: Joi.string().required()
      }
    }),
    async (req, res) => {
      let _id = generatePasteId();
      let data = req.body.data;
      let createdAt = new Date();

      try {
        let bin: Bin = {
          _id,
          data,
          createdAt
        };
        await storage.save(bin);
        res.status(200).json(bin);
      } catch (e) {
        res.status(500).json({
          "error": e
        });
      }
    }
  );

  app.get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().required().length(config.id.length)
      }
    }),
    async (req, res) => {
      let _id = req.params.id;
      let bin: Bin = await storage.find(_id);
      if (bin) {
        await res.status(200).json(bin);
      } else {
        await res.status(404).json({error: `Bin not found: ${_id}`});
      }
    }
  );

}
