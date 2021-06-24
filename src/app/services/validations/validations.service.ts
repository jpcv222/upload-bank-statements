import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { FileFormatI } from '../../models/file-format.interface'

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

   /**
   * @fileoverview  Row format validation from bank file uploaded
   * 
   * @param format       : File format interface
   * @param row          : Row content
   * @param number_row   : Row number
   * 
   * @returns       {JSON[]}
   * 
   * @author      Juan Castro - GitHub:jpcv222 <jcastro@trusot.com>
   * @copyright   trusot.com
   * 
   */

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

     
    //Validate date field
    if(typeof(row[format.date_position]) !== undefined){
      let date = row[format.date_position];
      //console.log(atob(format.date_format));
        if(!this.test_regexp(atob(format.date_format),date)){
          response.push({
            "row":number_row,
            "message":"Formato de fecha no válido"});
        }

      }else{
        response.push({
          "row":number_row,
          "message":"Fecha no definida"});
      }
     

    //Validate reference field
    if(typeof(row[format.reference_position]) !== undefined) {

      let reference:string = row[format.reference_position];

      if(this.isEmpty(reference)){
        response.push({
        "row":number_row,
        "message":"Referencia bancaria vacía"});
      }
  
    }else{
      response.push({
        "row":number_row,
        "message":"Referencia no definida"});
    }

    
    //Validate egress field
    if(typeof(row[format.egress_position]) !== undefined) {

      let egress = row[format.egress_position];

      if(this.isEmpty(egress) || !this.isNumber(egress)){
        response.push({
        "row":number_row,
        "message":"Valor de egreso no válido"});
      }
  
    }else{
      response.push({
        "row":number_row,
        "message":"Egreso no definido"});
    }

    //Validate movement amount
    if(typeof(row[format.income_position]) !== undefined 
        && typeof(row[format.egress_position]) !== undefined){
        
        let income_parsed = this.parseAmount(row[format.income_position]);
        let egress_parsed = this.parseAmount(row[format.egress_position]);

        let type = this.validateMovementType(parseFloat(income_parsed), parseFloat(egress_parsed));
        
        if(type === "INGRESO"){
          
        }

    }else{

    }

    //Validate income field
    if(typeof(row[format.income_position]) !== undefined) {

      let income = row[format.income_position];

      if(this.isEmpty(income) || !this.isNumber(income)){
        response.push({
        "row":number_row,
        "message":"Valor de ingreso no válido"});
      }
  
    }else{
      response.push({
        "row":number_row,
        "message":"Ingreso no definido"});
    }

    //Validate bank balance field
    if(typeof(row[format.bank_balance_position]) !== undefined) {

      let bank_balance = row[format.bank_balance_position];

      if(this.isEmpty(bank_balance) || !this.isNumber(bank_balance)){
        response.push({
        "row":number_row,
        "message":"Valor de saldo bancario no válido"});
      }
  
    }else{
      response.push({
        "row":number_row,
        "message":"Saldo bancario no definido"});
    }

    return response;
  }


  getMovementType(format: FileFormatI, row: any) :string{
    if(row[format.income_position]>0){
      return "income";
    }else {
      return "egress";
    }
  }

  validateMovementType (income: number, egress: number) : string{
    let type; 

    if(income === egress){

      let aux_egress = egress.toString();
      type = (aux_egress.includes("-")) ? "EGRESO":"INGRESO";

    }else{

      type   = (income > 0) ? "INGRESO" : "EGRESO";

    }

    return type;
  }

  parseAmount(amount: string){

    let amount_value :string = '';

    amount = amount.split(',').join('#');
    amount = amount.split('.').join('#');
    amount = amount.split(' ').join('');
    amount = amount.split('$').join('');

    let amount_substring :string[] = amount.split('#');
    if(amount_substring.length === 1){
      amount_value = amount_substring[0]+".00";
    }else{
      amount_substring.forEach( function callback (element, index) {
        if(element !== '-' && element !== ''){
          if(amount_substring.length >= 1){
            if(index < (amount_substring.length - 1)){
              amount_value += element;
            }else{
              amount_value += "."+element;
            }
          }
        }else{
            amount_value = "0.00";
        }
      });
  
    }

    return amount_value;

  }


   /**
   * @fileoverview  Number format validation
   * 
   * @param n       : Any data type
   * @returns       {boolean}
   * 
   * @author      Juan Castro - GitHub:jpcv222 <jcastro@trusot.com>
   * @copyright   trusot.com
   * 
   */

  isNumber(n: any): boolean{
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  /**
   * @fileoverview  Format validation, RegExp based
   * 
   * @param format : RegExp to validation
   * @param input  : String type
   * @returns       {boolean}
   * 
   * @author      Juan Castro - GitHub:jpcv222 <jcastro@trusot.com>
   * @copyright   trusot.com
   * 
   */

  test_regexp(format:string,input:string) :boolean {
    let regexp = new RegExp(format);
   
    return regexp.test(input);
  }

  /**
   * @fileoverview Validate if an input is empty
   * @param input   : String type
   * @returns       {boolean}
   * 
   * @author      Juan Castro - GitHub:jpcv222 <jcastro@trusot.com>
   * @copyright   trusot.com
   * 
   */
  
  isEmpty(input: string) :boolean {
    return input.trim().length === 0 || input === null;
  }
}
