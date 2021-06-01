import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './views/file-upload/file-upload.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'file-upload', component:FileUploadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponents = [LoginComponent, FileUploadComponent];