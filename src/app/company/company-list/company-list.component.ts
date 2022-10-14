import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { DataCommunicationService } from '../data-communication.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public searchInput:string;
  public companyList:Company[];

  constructor(private companyService:CompanyService, private router:Router, private dataCommunication:DataCommunicationService) { 
    this.companyList=[];
    this.searchInput="";
  }

  ngOnInit(): void {
    this.dataCommunication.CommunicationData$.subscribe((data:any)=>{
      if(data){
        this.getCompanyData();
      }
    })
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

  onEditCompany(company:Company){
    this.router.navigateByUrl(`company/edit/${company.id}`);
  }

  onDeleteCompany(companyId:number){
    if (confirm('Are you sure to delete this company?')){
      this.companyService.deleteCompanyDetails(companyId).subscribe(()=>{
        this.getCompanyData();
      })
    }
  }

  // searchData(){
  //   const search = this.searchInput.toLowerCase();
  //   if(search!=''){
  //     this.companyList = this.companyList.filter((item)=>{
  //       return item.companyName.toLowerCase().includes(search);
  //     })
  //   }
  //   this.getCompanyData();
  // }
}
