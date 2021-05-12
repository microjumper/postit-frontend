import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';

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
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    DialogModule
  ]
})
export class PrimengModule { }
