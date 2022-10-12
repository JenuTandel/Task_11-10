import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute
    ) { 
      //Add Breadcrumbs based on condition
      if(this.activatedRoute.snapshot.params['company_id'])
      {
        this.breadcrumbService.set("@Edit",'Company Name')
      }
      else{
        this.breadcrumbService.set("@Add",'Company List')
      }
    }

  ngOnInit(): void {
    
  }

}
