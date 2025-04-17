//=============================================================================
//===
//=== Copyright (C) 2025 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Injectable}  from "@angular/core";
import {Observable}  from "rxjs";
import {HttpService} from './http.service';

//=============================================================================

@Injectable()
export class StorageService {

  //---------------------------------------------------------------------------
  //---
  //--- Constructor
  //---
  //---------------------------------------------------------------------------

  constructor(private httpService: HttpService) {}

  //---------------------------------------------------------------------------
  //---
  //--- API methods
  //---
  //---------------------------------------------------------------------------

  public getTradingSystemDoc = (id:number): Observable<TradingSystemDoc> => {
    return this.httpService.get<TradingSystemDoc>('/api/storage/v1/trading-systems/'+ id +'/doc');
  }
}

//=============================================================================

export class TradingSystemDoc {
  name : string = ""
  doc  : string = ""
}

//=============================================================================
