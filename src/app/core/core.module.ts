import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './navbar/header/header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
  ],
  exports:[
    HeaderComponent
  ],
})
export class CoreModule { }
