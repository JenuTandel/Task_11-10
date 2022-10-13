import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

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

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    //Add Breadcrumbs based on condition
    if (this.activatedRoute.snapshot.params['company_id']) {
      this.breadcrumbService.set("@Edit", 'Company Name')
    }
    else {
      this.breadcrumbService.set("@Add", 'Company List')
    }
    this.companyForm = new FormGroup('');
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group(
      {
        id: [''],
        companyName: ['', Validators.required],
        companyDetails: ['', Validators.required],
        companyTags: ['', Validators.required],
        companyLogo: ['', Validators.required]
      }
    )

    console.log(this.companyForm);
    
  }

  uploadFile() {

  }

  get FormControls(): { [key: string]: AbstractControl } {
    return this.companyForm.controls
  }

  onSaveCompany() {
    this.isSubmitted = true;
    // console.log(this.isSubmitted);
    // console.log(this.companyForm);
  }

  onCancel() {

  }
}
