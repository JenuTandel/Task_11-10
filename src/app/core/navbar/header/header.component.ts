import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    //set breadcrumb for company module
    this.breadcrumbService.set('@Company', 'Company')
  }
}
