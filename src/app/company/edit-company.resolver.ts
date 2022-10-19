import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from './company.model';
import { CompanyService } from './company.service';

@Injectable()
export class EditCompanyResolver implements Resolve<Company> {

  constructor(private companyService: CompanyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Company> {
    return this.companyService.getCompanyById(route.params['company_id']);
  }
}
