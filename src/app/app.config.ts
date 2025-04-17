//=============================================================================
//===
//=== Copyright (C) 2025 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpService} from './service/http.service';
import {SessionService} from './service/session.service';
import {StorageService} from './service/storage.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {authConfig} from '../authentication';
import {APP_BASE_HREF} from '@angular/common';

//=============================================================================

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue:"/doc-editor/" },
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth(authConfig),
    HttpService,
    SessionService,
    StorageService
  ]
};

//=============================================================================
