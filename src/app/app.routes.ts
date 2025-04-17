//=============================================================================
//===
//=== Copyright (C) 2025 Andrea Carboni
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { Routes } from '@angular/router';
import {EditorComponent} from './editor/editor.component';

//=============================================================================

export const routes: Routes = [
  { path: "edit/:id", component: EditorComponent },
];

//=============================================================================
