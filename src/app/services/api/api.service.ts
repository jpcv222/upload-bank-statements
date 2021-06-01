import { Injectable } from '@angular/core';

import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { FileFormatI } from '../../models/file-format.interface';
import { FileFormatFilterI } from '../../models/file-format-filter.interface';
import { CompanyI } from '../../models/company.interface';
import { BankI } from '../../models/bank.interface';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://corpogaranon.fortiddns.com:666/trusot/"

  constructor(private http:HttpClient) { }

  login(form: LoginI):Observable<ResponseI>{
    let endpoint = this.url+"api/login/login.php";

    return this.http.post<ResponseI>(endpoint,form); 
  }

  upload(file: any):Observable<any> {

    let endpoint = "http://localhost:4200/";
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(endpoint, formData)
  }

  getFileFormat(id_bank: FileFormatFilterI):Observable<FileFormatI>{
    let endpoint = this.url+"api/bank_movements/getFileFormat.php";

    return this.http.post<FileFormatI>(endpoint,id_bank);
  }

  getCompanies():Observable<CompanyI>{
    let endpoint = this.url+"api/bank_movements/getCompanies.php";

    return this.http.get<CompanyI>(endpoint);
  }

  getBanks():Observable<BankI>{
    let endpoint = this.url+"api/bank_movements/getBanks.php";

    return this.http.get<BankI>(endpoint);
  }
  

}
