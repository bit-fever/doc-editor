//=============================================================================
//===
//=== Copyright (C) 2025 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {SessionService} from './service/session.service';
import {NgIf} from '@angular/common';

//=============================================================================

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, NgIf],
  standalone: true
})

//=============================================================================

export class AppComponent implements OnInit {

  //-------------------------------------------------------------------------
  //---
  //--- Constructor
  //---
  //-------------------------------------------------------------------------

  constructor(protected sessionService : SessionService) {
  }

  //-------------------------------------------------------------------------
  //---
  //--- Events
  //---
  //-------------------------------------------------------------------------

  ngOnInit() {
    this.sessionService.checkAuthentication();
  }
}

//=============================================================================
