import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatIconModule } from '@angular/material/icon';  
import { MatCardModule } from '@angular/material/card';  
import { MatButtonModule } from '@angular/material/button';  
import { MatProgressBarModule } from '@angular/material/progress-bar';  
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { CompanyUploadComponent } from './components/company-upload/company-upload.component';
import { FormatValidationComponent } from './components/format-validation/format-validation.component';
import { MovementsTableComponent } from './components/movements-table/movements-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    CompanyUploadComponent,
    FormatValidationComponent,
    MovementsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule, 
    MatStepperModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDividerModule, 
    NgxCsvParserModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
