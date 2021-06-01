import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { FileFormatI } from 'src/app/models/file-format.interface';
import { FileFormatFilterI } from '../../models/file-format-filter.interface';
import { BankI } from '../../models/bank.interface';

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
  header = false; 

  bankForm = this.fb.group({
    id_bank: ['', [Validators.required]],
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
  }

  validateFormatFile(id_bank: FileFormatFilterI){
    this.api.getFileFormat(id_bank).subscribe(data => {
      let response:FileFormatI = data;

      if(response != null && response != undefined){
        this.validateFormatRows(response, this.csvRecords);
      }else{
        this.errorStatus = true;
        this.errorMsg = "Formato de archivo no válido";
      }
    });
  }

  validateFormatRows(format: FileFormatI, records: any){
    let response: any[] = [];
    for(let i = 0; i < records.length; i++){
      response.push(this.validations.validateRow(format, records[i], i));
    }

    console.log(response);
  }

  showActiveBanks(){
    this.api.getBanks().subscribe(data => {
      let response:any = data;

      this.banks = response.records;
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.bankForm.value));
    if(this.bankForm.value.id_bank != "" && this.bankForm.value.id_bank != null){
      this.validateFormatFile({"id_bank": this.bankForm.value.id_bank});
    }
  }

}
