import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { setup } from './environments/environment';

setup();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(console.error);
