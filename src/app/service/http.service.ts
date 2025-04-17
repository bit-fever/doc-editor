//=============================================================================
//===
//=== Copyright (C) 2023 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Injectable} from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaderResponse, HttpHeaders, HttpProgressEvent, HttpResponse } from "@angular/common/http";

import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {SessionService} from "./session.service";

//=============================================================================

@Injectable()
export class HttpService {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private httpClient    : HttpClient,
              private sessionService: SessionService) {
  }

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public get = <T = any>(url : string, options? : any): Observable<T> => {

		return this.httpClient.get<T>(url, this.setupOptions(options)).pipe(
			catchError((err, caught) => this.handleError(err, caught)),
		);
	}

	//-------------------------------------------------------------------------

	public post = <T = any>(url: string, object: any, options?: any): Observable<T> => {

    return this.httpClient.post<T>(url, object, this.setupOptions(options)).pipe(
			catchError((error, caught) => this.handleError(error, caught)),
		);
	}

	//-------------------------------------------------------------------------

	public put = <T = any>(url: string, object: any, options?: any): Observable<T> => {

	  return this.httpClient.put<T>(url, object, this.setupOptions(options)).pipe(
	    catchError((error, caught) => this.handleError(error, caught)),
    );
	}

	//-------------------------------------------------------------------------

	public delete = <T = any>(url: string, options?: any): Observable<T> => {

	  return this.httpClient.delete<T>(url, this.setupOptions(options)).pipe(
		  catchError((error, caught) => this.handleError(error, caught)),
	  );
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

  private setupOptions(options : any) : any {
    if ( ! this.sessionService.isAuthenticated) {
      return options;
    }

    if (options == null) {
      options = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.sessionService.accessToken,
        }),
      }
    }
    else {
      let headers = options.headers

      if ( ! headers) {
        headers = new HttpHeaders()
      }

      options.headers = headers.set('Authorization', 'Bearer ' + this.sessionService.accessToken)
    }

    return options;
  }

  //-------------------------------------------------------------------------

	private handleError = (err: HttpErrorResponse, caught: Observable<any>) : Observable<any> => {

		console.log("HTTP error : " + JSON.stringify(err));
    console.log("Observable : " + JSON.stringify(caught));

		let reqError = {
      code : err.status.toString(),
      error: err.error.error.toString()
    };

//		this.eventBusService.emitToError(reqError);

		return throwError(reqError);
	}
}

//=============================================================================
