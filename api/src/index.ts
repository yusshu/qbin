require('dotenv').config();

import express from 'express';
import load from './loader/main';

function main() {
  let port = process.env.PORT || 3000;
  let app = express();

  load(app)
      .then(() => {
        app.listen(port, () =>
          console.log(`[INFO] Server listening on port ${port}`)
        );
        console.log('[INFO] Everything loaded correctly')
      })
      .catch(console.error);
}

main();
