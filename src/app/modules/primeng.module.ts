import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    RippleModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
  ]
})
export class PrimengModule { }
