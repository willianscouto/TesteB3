import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import {DataService} from './services/data.service';
import {DialogSearchComponent} from './components/dialog-seach/dialog-search.component';



@NgModule({
  declarations: [
      AppComponent,
      DialogSearchComponent,
      HomePageComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatDialogModule,
      FormsModule,
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatSortModule,
      MatTableModule,
      MatToolbarModule,
      MatPaginatorModule,
      ReactiveFormsModule,
      MatSnackBarModule
  ],
  providers: [
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
