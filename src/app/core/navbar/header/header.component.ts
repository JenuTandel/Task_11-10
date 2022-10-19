import { Component, OnInit } from '@angular/core';
import { DataCommunicationService } from 'src/app/company/data-communication.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public companyName!:string;
  public companyId!:number;
  constructor( private breadcrumbService: BreadcrumbService, private dataCommunicationService:DataCommunicationService) { }

  ngOnInit(): void {
    this.dataCommunicationService.BreadCrumbData.subscribe((res:any)=>{
      this.companyId = res.companyId;
      this.companyName = res.companyName;
    })
  }
}
