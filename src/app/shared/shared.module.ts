import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameLogoPipePipe } from './pipes/name-logo-pipe/name-logo-pipe.pipe';



@NgModule({
  declarations: [
    NameLogoPipePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NameLogoPipePipe
  ]
})
export class SharedModule { }
