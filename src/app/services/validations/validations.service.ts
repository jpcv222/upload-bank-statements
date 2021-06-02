import { Injectable } from '@angular/core';

import { FileFormatI } from '../../models/file-format.interface'

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  validateRow(format: FileFormatI, row: any, number_row: number): any{
    let response: any[] = [];

    //Validate number of columns
    //The format should have a number of columns between min_column_number AND max_column_number

    if(!(row.length >= format.min_column_number && 
      row.length <= format.max_column_number)){

        response.push({
        "row":number_row,
        "message":"Cantidad de columnas erróneas"});
        
      }
     
    //Validate date field and date format
    if(row[format.date_position] !== undefined){
        if(row[format.date_position]){

        }
        response.push({
        "row":number_row,
        "message":"Formato de fecha no válido"});

      }else{
        response.push({
          "row":number_row,
          "message":"Fecha no ingresada"});
      }
     /*

    //Validate reference field and reference format
    for(let j = 0; format.reference_position.length; j++){
      if(!(typeof(row[format.reference_position[j]]) !== undefined 
          || row[format.reference_position[j]].isEmpty())){

        response.push({"status":false,
        "row":number_row,
        "message":"Error en referencia"});
  
      }
    }
    
    //Validate egress field and egress format
    if(!(row[format.egress_position] !== undefined 
        || row[format.egress_position].isEmpty())
        || !this.isNumber(row[format.income_position])
    ){

      response.push({"status":false,
      "row":number_row,
      "message":"Formato de egreso no válido"});

    }

    //Validate income field and income format
    if(!(row[format.income_position] !== undefined 
      || row[format.income_position].isEmpty())
      || !this.isNumber(row[format.income_position])
    ){

      response.push({"status":false,
      "row":number_row,
      "message":"Formato de ingreso no válido"});

    }
    */

    return response;
  }

  isDate(date:string,format:string): boolean{
    let pattern = new RegExp(format);
    return pattern.test(date);
  }

  isNumber(n: any): boolean{
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }
}
