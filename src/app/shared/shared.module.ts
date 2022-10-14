import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameLogoPipePipe } from './pipes/name-logo-pipe/name-logo-pipe.pipe';
import { SearchPipe } from './pipes/search pipe/search.pipe';



@NgModule({
  declarations: [
    NameLogoPipePipe,
    SearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NameLogoPipePipe,
    SearchPipe
  ]
})
export class SharedModule { }
