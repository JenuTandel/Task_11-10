import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Company } from './company.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class DataCommunicationService {

  public CommunicationData$: Observable<Company>;
  private CommunicationData: Subject<Company>;

  public BreadCrumbData: Subject<any>;

  constructor() {
    this.CommunicationData = new Subject();
    this.CommunicationData$ = this.CommunicationData.asObservable();

    this.BreadCrumbData = new Subject();
  }

  getData(company: Company) {
    this.CommunicationData.next(company);
  }

  getCompanyName(companyName:string, companyId:number){
    this.BreadCrumbData.next({companyName,companyId});
    // this.BreadCrumbData.next(companyId);
  }
}
