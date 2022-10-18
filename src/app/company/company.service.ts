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

  /**
   * Method for HTTP get Service
   * @returns Company[]
   */
  getCompanyDetails(): Observable<Company[]>{
    const url = `${this.baseURL}/companyDetails`;
    return this.http.get<Company[]>(url);
  }

  /**
   * Method for HTTP post Service
   * @param company
   * @returns company
   */
  addCompanyDetails(company:Company):Observable<Company>{
    const url = `${this.baseURL}/companyDetails`;
    return this.http.post<Company>(url,company);
  }

  /**
   * Method for HTTP delete Service
   * @param company_id 
   * @returns company
   */
  deleteCompanyDetails(company_id:number):Observable<Company>{
    const url = `${this.baseURL}/companyDetails/${company_id}`;
    return this.http.delete<Company>(url);
  }

  /**
   * Method for HTTP put Service
   * @param company 
   * @param company_id 
   * @returns company
   */
  updateCompanyDetails(company:Company, company_id:number):Observable<Company>{
    const url = `${this.baseURL}/companyDetails/${company_id}`;
    return this.http.put<Company>(url,company);
  }

  /**
   * Method for HTTP get Service for particular company
   * @param company_id 
   * @returns company
   */
  getCompanyById(company_id:number):Observable<Company>{
    const url = `${this.baseURL}/companyDetails/${company_id}`;
    return this.http.get<Company>(url);
  }
}
