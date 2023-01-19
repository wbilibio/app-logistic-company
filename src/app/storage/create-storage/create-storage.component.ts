import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StorageController} from "@api/controllers/storage.controller";

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.scss']
})
export class CreateStorageComponent implements OnInit {
  public address: any;

  readonly formCreateStorage = new FormGroup({
    name: new FormControl('', Validators.required),
    limit_stock: new FormControl('', Validators.required)
  });

  constructor(
    private ref: MatDialogRef<CreateStorageComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    public snackBar: MatSnackBar,

    private storageController: StorageController
  ) {}

  ngOnInit(): void {
  }

  onAddressSelected(address: any) {
    this.address = address;
  }
  createStorage() {
    let body = {...this.formCreateStorage.getRawValue(), ...this.address};
    /** send data */
    let responseAPI$ = this.storageController.save(body);
    responseAPI$.subscribe({
      next: value => {
        if(value?.status === 409) {
          this.ref.close(value.response.message);
        } else {
          this.ref.close('success');
        }
      },
      error: err => {
        this.ref.close('error');
        console.log('obs error', err)
      }
    });
    this.formCreateStorage.disable();
  }
  close(){
    this.ref.close();
  }

}
