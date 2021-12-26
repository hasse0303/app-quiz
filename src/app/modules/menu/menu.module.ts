import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { DialogInfoComponent } from './menu-page/dialog-info/dialog-info.component';


@NgModule({
  declarations: [
    MenuPageComponent,
    DialogInfoComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxContentLoadingModule
  ]
})
export class MenuModule { }
