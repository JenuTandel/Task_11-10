import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public companyList:Company[];
  constructor(private companyService:CompanyService) { 
    this.companyList=[];
  }

  ngOnInit(): void {
    this.getCompanyData();
  }

  getCompanyData(){
    this.companyService.getCompanyDetails().subscribe((data:Company[])=>{
      this.companyList = data;
    })
  }


}
