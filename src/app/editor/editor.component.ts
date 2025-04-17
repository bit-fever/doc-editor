//=============================================================================
//===
//=== Copyright (C) 2025 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

declare var $:any

//=============================================================================

@Component({
  selector   : 'editor',
  templateUrl: './editor.component.html',
  styleUrl   : './editor.component.scss',
  imports    : [MatToolbarModule, MatButtonModule],
  standalone : true
})

//=============================================================================

export class EditorComponent implements OnInit {

  //-------------------------------------------------------------------------
  //---
  //--- Constructor
  //---
  //-------------------------------------------------------------------------

  constructor() {
  }

  //-------------------------------------------------------------------------
  //---
  //--- Events
  //---
  //-------------------------------------------------------------------------

  ngOnInit() {
    $("#doc-editor").trumbowyg({
      svgPath: "icons.svg"
    });
//    this.sessionService.checkAuthentication();
  }
}

//=============================================================================
