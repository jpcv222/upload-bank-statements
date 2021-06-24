import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { BankMovementI } from '../../models/bank-movements.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: BankMovementI[] = [
  {id_bank: 1, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079},
  {id_bank: 2, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079},
  {id_bank: 3, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079},
  {id_bank: 4, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079},
  {id_bank: 5, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 300.0079},
  {id_bank: 6, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.00},
  {id_bank: 2, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079},
  {id_bank: 3, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079},
  {id_bank: 4, id_company: 1, date: '2021-03-09', reference: '2021-03-09', amount: 12.0079}

];

@Component({
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.css']
})
export class MovementsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_bank', 'id_company', 'date', 'reference', 'egress', 'income'];
  dataSource = new MatTableDataSource<BankMovementI>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

  constructor() { 
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
