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
  public searchInput: string;
  public companyList: Company[];
  public dataNotFound!: string;

  constructor(private companyService: CompanyService, private router: Router, private dataCommunication: DataCommunicationService) {
    this.companyList = [];
    this.searchInput = "";
  }
  ngOnInit(): void {
    this.dataCommunication.CommunicationData$.subscribe((data: any) => {
      if (data) {
        this.getCompanyData();
      }
    })
    this.getCompanyData();
    console.log(this.companyList.length);
  }

  /**
   * Function for call the HTTP get service method
   */
  getCompanyData() {
    this.companyService.getCompanyDetails().subscribe((data: Company[]) => {
      this.companyList = data;
    })
  }

  /**
   * When + (Add) button is clicked, this function is executed
   */
  onAddCompany() {
    this.router.navigateByUrl('company/add');
  }

  /**
   * When we clicked on the list of company, this function is executed for edit the data
   */
  onEditCompany(company: Company) {
    this.router.navigateByUrl(`company/edit/${company.id}`);
  }

  /**
   * When X (delete) button is clicked, this function is executed
   * @param companyId 
   */
  onDeleteCompany(companyId: number) {
    if (confirm('Are you sure to delete this company?')) {
      this.companyService.deleteCompanyDetails(companyId).subscribe(() => {
        this.getCompanyData();
      })
      this.router.navigateByUrl("company/add")
    }
  }
}
