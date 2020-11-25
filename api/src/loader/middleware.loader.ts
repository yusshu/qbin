import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import morgan from 'morgan';
import { Application } from 'express';

export default (app: Application) => {

  let development = process.env.NODE_ENV === 'development';

  if (development) {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');

      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();

      app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
      });
    });
  }

  app.use(errors());
  app.use(morgan(development ? 'dev' : 'tiny'));
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
}
