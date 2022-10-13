import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public companyList:Company[];
  constructor(private companyService:CompanyService, private router:Router) { 
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

  onAddCompany(){
    this.router.navigateByUrl('company/add');
  }

  onEdit(company:Company){
    this.router.navigateByUrl(`company/edit/${company.id}`);
  }

  onDeleteCompany(companyId:number){
    if (confirm('Are you sure to delete this company?')){
      this.companyService.deleteCompanyDetails(companyId).subscribe(()=>{
        this.getCompanyData();
      })
    }
  }
}
