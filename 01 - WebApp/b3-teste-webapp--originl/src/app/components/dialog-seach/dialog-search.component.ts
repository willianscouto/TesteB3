import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup, Validators,ValidatorFn ,AbstractControl,ValidationErrors} from '@angular/forms';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';


@Component({
  selector: 'app-add.dialog',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css']
})


export class DialogSearchComponent {
  dialogSearchValidations: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchCDB,
    public dataService: DataService) { }

    formControl = new FormControl('', [
      Validators.required
    ]);
  
    getErrorMessage() {
      
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('valueN') ? 'Valor não pode ser negativo' :
          '';
    }
  

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmSearch(): void {
    if(this.data.valorMonetario < 1) return;
    else if(this.data.totalMesesResgate < 1) return;
    else this.dataService.getCDBValores(this.data.valorMonetario, this.data.totalMesesResgate);

  }

}
export class SearchCDB {
  valorMonetario: any;
  totalMesesResgate: number;
}

export function totalMesesValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }
      const totalMesesValid = value>0;

      return !totalMesesValid ? {totalMesesStrength:true}: null;
  }
}


