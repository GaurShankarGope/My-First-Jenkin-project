import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './store/reducers/login.reducer';
import { registerReducer } from './store/reducers/register.reducer';
import { itemReducer } from './store/reducers/item.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
  provideStore({ login: loginReducer, register: registerReducer, item: itemReducer }),
     provideStoreDevtools()
  ]
};
