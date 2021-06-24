import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CompanyI } from '../../models/company.interface';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-company-upload',
  templateUrl: './company-upload.component.html',
  styleUrls: ['./company-upload.component.css']
})
export class CompanyUploadComponent implements OnInit {

  errorStatus:boolean = false;
  errorMsg:any = "";

  companies: CompanyI[] =  [{id_company: 0, rfc: "",name_company:""}];

  companyForm = this.fb.group({
    id_company: ['', [Validators.required]]
  });

  constructor(private api: ApiService,
              private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.showActiveCompanies();
  }

  showActiveCompanies(){
    this.api.getCompanies().subscribe(data => {
      let response:any = data;

      this.companies = response.records;
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.companyForm.value));
  }

}
