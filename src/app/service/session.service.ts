//=============================================================================
//===
//=== Copyright (C) 2022 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Injectable} from '@angular/core';

import {EventTypes, OidcSecurityService, PublicEventsService, UserDataResult} from "angular-auth-oidc-client";
import {filter} from "rxjs/operators";

//=============================================================================

@Injectable()
export class SessionService {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

  isAuthenticated = false;
  accessToken : string|null = null;
  userData    : UserDataResult|null = null;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private oidcSecurityService: OidcSecurityService,
              private publicEventService : PublicEventsService) {

    publicEventService.registerForEvents()
      .pipe(filter( (notification) => notification.type === EventTypes.NewAuthenticationResult))
      .subscribe( (value) => {
        oidcSecurityService.getAccessToken().subscribe( (token) => {
          this.accessToken = token
        })
      })
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

  public checkAuthentication() {
    console.log("Checking authentication...")

    this.oidcSecurityService.checkAuth().subscribe((res) => {
      this.isAuthenticated = res.isAuthenticated;
      this.userData        = res.userData;
      this.accessToken     = res.accessToken;

      console.log('Authenticated : '+ this.isAuthenticated);

      if ( ! this.isAuthenticated) {
        console.log("User not authenticated.");
        this.login();
      }
    });
  }

  //-------------------------------------------------------------------------

  login() {
    console.log('Calling login...');
    this.oidcSecurityService.authorize();
  }
}

//=============================================================================
