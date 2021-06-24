import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FileFormatI } from 'src/app/models/file-format.interface';
import { FileFormatFilterI } from '../../models/file-format-filter.interface';
import { BankI } from '../../models/bank.interface';
import { CompanyI } from '../../models/company.interface';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

import { ApiService } from '../../services/api/api.service';
import { ValidationsService } from '../../services/validations/validations.service';

@Component({
  selector: 'app-format-validation',
  templateUrl: './format-validation.component.html',
  styleUrls: ['./format-validation.component.css']
})
export class FormatValidationComponent implements OnInit {

  errorStatus:boolean = false;
  errorMsg:any = "";

  csvRecords: any[] = [];

  banks: BankI[] =  [{id_bank: 0, name_bank:""}];
  companies: CompanyI[] =  [{id_company: 0, rfc: "",name_company:""}];

  header = false; 

  bankForm = this.fb.group({
    id_bank: ['', [Validators.required]],
    id_company: ['', [Validators.required]],
    file: ['', [Validators.required]]
  });

  constructor(private api: ApiService, 
              private ngxCsvParser: NgxCsvParser, 
              public fb: FormBuilder,
              private validations: ValidationsService) { }


  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {

        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.errorStatus = true;
        this.errorMsg = "Error al cargar el archivo";
      });

  }

  ngOnInit(): void {
    this.showActiveBanks();
    this.showActiveCompanies();
  }

  validateFormatFile(id_bank: FileFormatFilterI){
    this.api.getFileFormat(id_bank).subscribe(data => {
      let response:FileFormatI = data;

      if(response != null && response != undefined){

        let validation_result = this.validateFormatRows(response, this.csvRecords);
        if(validation_result.length !== 0){
          console.log(validation_result);
        }else{
          console.log("Formato existente");
        }
      }else{
        this.errorStatus = true;
        this.errorMsg = "Formato de banco no definido";
      }
    });
  }

  validateFormatRows(format: FileFormatI, records: any): any {
    let response: any[] = [];
    for(let i = format.initial_row; i < records.length; i++){
      let row_validation_result = this.validations.validateRow(format, records[i], i);
      if(row_validation_result.length != 0){
        response.push(row_validation_result);
      }
    }

    return response;
  }

  showActiveBanks(){
    this.api.getBanks().subscribe(data => {
      let response:any = data;

      this.banks = response.records;
    });
  }

  showActiveCompanies(){
    this.api.getCompanies().subscribe(data => {
      let response:any = data;

      this.companies = response.records;
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.bankForm.value));
    if(this.bankForm.value.id_bank != "" && this.bankForm.value.id_bank != null){
      this.validateFormatFile({"id_bank": this.bankForm.value.id_bank});
    }
  }

}
