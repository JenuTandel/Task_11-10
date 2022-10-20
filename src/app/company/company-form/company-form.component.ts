import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  public companyLogoForm: FormGroup
  public isSubmitted: boolean = false;
  public companyId: string;
  public company_name!: string;
  public title: string = "";

  public base64String: any = "";
  public imagePath: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private dataCommunication: DataCommunicationService,
    private _sanitizer: DomSanitizer
  ) {
    this.companyForm = new FormGroup('');
    this.companyLogoForm = new FormGroup('');
    this.companyId = "";
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
    this.activatedRoute.data.subscribe((data) => {
      this.companyForm.patchValue(data['company']);
      this.company_name = data['company']?.companyName;
      this.companyId = data['company']?.id;
      this.dataCommunication.getCompanyName(this.company_name, Number(this.companyId));
    })
    this.title = this.companyId ? "Edit" : "Add";
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
    debugger;
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
   * Function for company logo uploading
   * @param event 
   */
  imageUploaded(event: any) {
    debugger
    var imagefile = event.target.files[0];
    var reader = new FileReader();

    reader.onload = () => {
      this.base64String = String(reader.result).replace("data:", "")
        .replace(/^.+,/, "");
      console.log(this.base64String);
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64String);
    }
    reader.readAsDataURL(imagefile);
  }
}
