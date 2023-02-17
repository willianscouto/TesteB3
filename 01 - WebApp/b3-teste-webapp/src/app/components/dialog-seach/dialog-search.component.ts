import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup, Validators,ValidatorFn ,AbstractControl,ValidationErrors} from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "./../notifications/notifications.service";



@Component({
  selector: 'app-add.dialog',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css']
})


export class DialogSearchComponent {
  dialogSearchValidations: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchCDB,
    public dataService: DataService,
    public notificationService: NotificationService) { }

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
    if( this.data.valorMonetario === null || this.data.valorMonetario === undefined ){this.showAlert("Erro: O valor monetário não pode estar vazio !!!"); return;}
    else if( this.data.totalMesesResgate === null || this.data.totalMesesResgate === undefined ){this.showAlert("Erro: O total de meses não pode estar vazio !!!"); return;}
    else if (this.data.valorMonetario < 1) {this.showAlert("Erro: O valor monetário não pode ser menor que 1 !!!"); return;}
    else if(this.data.totalMesesResgate < 1)  {this.showAlert("Erro: O total de meses não pode ser menor que 1 !!!"); return;}
    else this.dataService.getCDBValores(this.data.valorMonetario, this.data.totalMesesResgate);
    
  }



  showAlert(msg:string) {
    this.notificationService.error(msg);
   
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



// Alert Confirmation
// openSnackBar(message: string, action: string, className: string) {
//   this._snackBar.open(message, action, {
//     duration: 0,
//     panelClass: [className]
//   });
// }

// showAlert() {
//   this.notificationService.alert("an alert", "notice", () => {
//     this.notificationService.success("alert oked");
//   });
// }

// showConfirm() {
//   this.notificationService.confirmation("it will be gone forever", () => {
//     this.notificationService.success("confirm oked");
//   },
//   'Are you sure?',
//    () => {
//     this.notificationService.error("confirm canceled");
//   });
// }