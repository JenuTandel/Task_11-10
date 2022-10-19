import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { DataCommunicationService } from '../data-communication.service';
import { EditCompanyResolver } from '../edit-company.resolver';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  TagList = [
    { tag_id: '1', tag_text: 'Tag1' },
    { tag_id: '2', tag_text: 'Tag2' },
    { tag_id: '3', tag_text: 'Tag3' },
    { tag_id: '4', tag_text: 'Tag4' },
  ];

  public companyForm: FormGroup;
  public isSubmitted: boolean = false;
  public companyId: string;
  private companyName: string = "";
  public title: string = "";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private dataCommunication: DataCommunicationService,
  ) {
    this.companyForm = new FormGroup('');
    this.companyId = "";
   
    // this.activatedRoute.params.subscribe((params) => {
    //   this.companyId = params['company_id'];
    //   if (this.companyId) {
    //     // this.getCompanyDetails();
    //     setTimeout(() => {
    //       this.breadcrumbService.set("@Edit", this.companyName)
    //     }, 200);
    //     this.title = "Edit";
    //   }
    //   else {
    //     this.breadcrumbService.set("@Add", 'Company List');
    //     this.title = "Add";
    //   }
    // });
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group(
      {
        id: [''],
        companyName: ['', Validators.required],
        companyDescription: ['', Validators.required],
        companyTags: ['', Validators.required],
        companyLogo: ['', Validators.required]
      }
    )
    console.log(this.companyForm);
    console.log(this.activatedRoute);
    
    this.activatedRoute.data.subscribe((data)=>{
      this.companyForm.patchValue(data['company']);
    })
  }
  uploadFile() {

  }
  /**
   * Function that returns the formcontrols
   */
  get FormControls(): { [key: string]: AbstractControl } {
    return this.companyForm.controls
  }

  /**
   * When Submit button is called, this function is executed.
   */
  onSaveCompany() {
    this.isSubmitted = true;
    if (this.companyForm.valid) {
      if (this.companyId) {
        this.EditCompanyData();
      }
      else {
        this.AddCompanyData();
      }
    }
    this.companyForm.reset();
    this.isSubmitted = false;
    this.router.navigateByUrl("company/add");
  }

  /**
   * When Cancel button is called, this function is executed.
   */
  onCancel() {
    this.companyForm.reset();
    this.router.navigateByUrl("company/add")
  }

  /**
   * Function for call the HTTP post service method
   */
  AddCompanyData() {
    this.companyService.addCompanyDetails(this.companyForm.value).subscribe((data: Company) => {
      this.dataCommunication.getData(data);
    })
  }

  /**
   * Function for call the HTTP put service method
   */
  EditCompanyData() {
    this.companyService.updateCompanyDetails(this.companyForm.value, Number(this.companyId)).subscribe((data) => {
      this.dataCommunication.getData(data);
    })
  }

  /**
   * Function for call the HTTP get service by Id method
   */
  // getCompanyDetails() {
  //   this.companyService.getCompanyById(Number(this.companyId)).subscribe((data: Company) => {
  //     this.companyForm.patchValue(data);
  //     this.companyName = data.companyName;
  //   })
  // }
}
