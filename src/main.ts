import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { ENV } from './env/env';

if (ENV.isProd) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
