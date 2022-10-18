import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { DataCommunicationService } from '../data-communication.service';

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
  public companyLogoForm:FormGroup
  public isSubmitted: boolean = false;
  public companyId: string;
  private companyName: string="";
  public title:string="";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private dataCommunication: DataCommunicationService
  ) {
    
    this.companyForm = new FormGroup('');
    this.companyLogoForm = new FormGroup('');
    this.companyId = "";
    this.activatedRoute.params.subscribe((params) => {
      this.companyId = params['company_id'];
      this.getCompanyDetails();

      if(this.companyId){
        setTimeout(() => {
          this.breadcrumbService.set("@Edit", this.companyName)
        }, 200);
        this.title="Edit";
      }
      else {
        this.breadcrumbService.set("@Add", 'Company List');
        this.title="Add";
      }
    });
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

    this.companyLogoForm = this.formBuilder.group(
      {
        id:[''],
        imageURL:['']
      }
    )
    console.log(this.companyForm);
  }

  uploadFile() {
    console.log(this.companyForm.controls['companyLogo'].value);
    
    this.companyService.uploadImage(this.companyForm.controls['companyLogo'].value).subscribe((data)=>{
      console.log(data);
      
    });
    
  }

  get FormControls(): { [key: string]: AbstractControl } {
    return this.companyForm.controls
  }

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
    this.router.navigateByUrl("company/add");

  }

  onCancel() {
    this.companyForm.reset();
    this.router.navigateByUrl("company/add")
  }

  AddCompanyData() {
    this.companyService.addCompanyDetails(this.companyForm.value).subscribe((data: Company) => {
      this.dataCommunication.getData(data);
    })
  }

  EditCompanyData() {
    this.companyService.updateCompanyDetails(this.companyForm.value, Number(this.companyId)).subscribe((data) => {
      this.dataCommunication.getData(data);
    })
  }

  getCompanyDetails() {
    this.companyService.getCompanyById(Number(this.companyId)).subscribe((data: Company) => {
      this.companyForm.patchValue(data);
      this.companyName = data.companyName;
    })
  }
}
