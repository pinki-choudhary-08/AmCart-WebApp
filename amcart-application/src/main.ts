import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as ENV_PROD from './environments/environment.prod';

// Enum for available list of currently supported environments
const environments = {
  prod: 'prod',
};

(async () => {
  // Fetching the environment value from app-config.json
  // Content of app-config.json file will replaced at the time of deployment.

  const response = await fetch('assets/app-config.json');
  const json = await response.json();
  const env = json.environment;
  // Add another if check to give support to new environment.
  if (env === environments.prod) {
    Object.assign(environment, ENV_PROD.environment);
  }
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
})();