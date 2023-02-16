import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Cdb} from './../entities/cdb';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://localhost:7176/api/CDB';

  dataChange: BehaviorSubject<Cdb[]> = new BehaviorSubject<Cdb[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Cdb[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getCDBValores(valorInvestimento: any,totalMeses:number): void {

    var endpoint = this.API_URL + "?valorInvestimento="+valorInvestimento +"&totalMeses="+totalMeses;
    this.httpClient.get<Cdb[]>(endpoint).subscribe(data => {
      this.dialogData = data;
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      return;
      });
  }

}

