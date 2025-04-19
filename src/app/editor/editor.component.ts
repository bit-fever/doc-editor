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
import {StorageService} from '../service/storage.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  //--- Variables
  //---
  //-------------------------------------------------------------------------

  private tsId : number = 0
  title : string = ""

  //-------------------------------------------------------------------------
  //---
  //--- Constructor
  //---
  //-------------------------------------------------------------------------

  constructor(private route         : ActivatedRoute,
              private snackBar      : MatSnackBar,
              private storageService: StorageService) {
  }

  //-------------------------------------------------------------------------
  //---
  //--- Init
  //---
  //-------------------------------------------------------------------------

  ngOnInit() {
    $("#doc-editor").trumbowyg({
      svgPath: "icons.svg"
    });

    this.tsId = Number(this.route.snapshot.paramMap.get("id"));
    this.storageService.getTradingSystemDoc(this.tsId).subscribe( res => {
      this.title = res.name
      $('#doc-editor').trumbowyg('html', res.documentation);
    })
  }

  //-------------------------------------------------------------------------
  //---
  //--- Events
  //---
  //-------------------------------------------------------------------------

  onSaveClick() {
    let doc = $('#doc-editor').trumbowyg('html');

    this.storageService.setTradingSystemDoc(this.tsId, doc).subscribe( res => {
      this.snackBar.open("Documentation saved", undefined, { duration: 3000 })
    })
  }
}

//=============================================================================
