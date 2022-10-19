import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { BreadcrumbModule } from "xng-breadcrumb";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from './company.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DataCommunicationService } from './data-communication.service';
import { EditCompanyResolver } from './edit-company.resolver';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyFormComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    BreadcrumbModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule
  ],
  providers:[CompanyService,DataCommunicationService, EditCompanyResolver]
})
export class CompanyModule { }
