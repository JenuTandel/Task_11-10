import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyComponent } from './company.component';
import { EditCompanyResolver } from './edit-company.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: CompanyComponent,
    
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'add'
      },
      {
        path:'add',
        component:CompanyFormComponent,
      },
      {
        path:'edit/:company_id',
        component:CompanyFormComponent,
        resolve: {company: EditCompanyResolver},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
