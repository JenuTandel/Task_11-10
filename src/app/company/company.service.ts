import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company.model';

@Injectable()
export class CompanyService {

  private baseURL:string;
  constructor(private http:HttpClient) {
    this.baseURL = "http://localhost:3000"
  }

  getCompanyDetails(): Observable<Company[]>{
    const url = `${this.baseURL}/companyDetails`;
    return this.http.get<Company[]>(url);
  }

  addCompanyDetails(company:Company):Observable<Company>{
    const url = `${this.baseURL}/companyDetails`;
    return this.http.post<Company>(url,company);
  }

  deleteCompanyDetails(company_id:number):Observable<Company>{
    const url = `${this.baseURL}/companyDetails/${company_id}`;
    return this.http.delete<Company>(url);
  }
}
