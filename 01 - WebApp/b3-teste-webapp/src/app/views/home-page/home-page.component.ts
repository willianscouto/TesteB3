import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { DialogSearchComponent } from '../../components/dialog-seach/dialog-search.component';
import { Cdb } from 'src/app/entities/cdb';
import { map } from 'rxjs/operators';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  displayedColumns = ['mes', 'valorMonetario', 'valorBruto', 'valorLiquido'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource;
  index!: number;
  mes!: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DataService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  getCdb() {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: { cdn: Cdb }
    });

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addSimulacao() {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: { Cdb: Cdb }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
       
        const foundIndex = this.exampleDatabase?.dataChange.value;
        foundIndex?.map((obj: any) => {
          if (obj === undefined) return;
          this.exampleDatabase?.dataChange.value.splice(obj, 1);
        })

      
        this.exampleDatabase?.dataChange.value.push(this.dataService.dialogData);
        this.refreshTable();
      }
    });
  }

  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }


}


export class ExampleDataSource extends DataSource<Cdb> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Cdb[] = [];
  renderedData: Cdb[] = [];

  constructor(public _exampleDatabase: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Cdb[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];




    return merge(...displayDataChanges).pipe(map(() => {

      const data: Cdb[] = [];

      this._exampleDatabase.data.map((obj: any) => {
        if (obj === undefined) return;

        for (var i = 0; i < obj.length; i++) {
          data.push(obj[i]);
        }
      });


      // Filter data
      this.filteredData = data.slice().filter((cdb: Cdb) => {
        const searchStr = (cdb.mes.toString() + cdb.valorMonetario.toString() + cdb.valorBruto.toString() + cdb.valorLiquido.toString()).toLowerCase();
        const textFilter = this.filter.toLowerCase();
        return searchStr.indexOf(textFilter) !== -1;

      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData);

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: Cdb[]): Cdb[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'mes': [propertyA, propertyB] = [a.mes, b.mes]; break;
        case 'valorMonetario': [propertyA, propertyB] = [a.valorMonetario, b.valorMonetario]; break;
        case 'valorBruto': [propertyA, propertyB] = [a.valorBruto, b.valorBruto]; break;
        case 'valorLiquido': [propertyA, propertyB] = [a.valorLiquido, b.valorLiquido]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
