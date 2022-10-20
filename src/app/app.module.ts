import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DataCommunicationService } from './company/data-communication.service';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [BreadcrumbService, DataCommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
