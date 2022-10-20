import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './navbar/header/header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { RouterModule } from '@angular/router';
import { DataCommunicationService } from '../company/data-communication.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterModule
  ],
  exports:[
    HeaderComponent
  ],
 
})
export class CoreModule { }
