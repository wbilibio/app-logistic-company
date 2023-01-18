import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageController} from "@api/controllers/storage.controller";

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.scss']
})
export class EditStorageComponent implements OnInit {
  public storageName: string = '';
  public address:any;

  public formGeneral = this.fb.group({
    name: new FormControl('', Validators.required),
    limit_stock: new FormControl('', Validators.required),
  });

  public isLoading = true;

  public storageId: string = this.route.snapshot.params['storage'];

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    readonly router: Router,
    private storageController: StorageController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getStorage()

    this.isLoading = false;
  }


  getStorage() {
    if(this.storageId){
      let get$ = this.storageController.get(this.storageId);
      get$.subscribe({
        next: value => {
          this.formGeneral.patchValue({
            name: value.name,
            limit_stock: value.limit_stock,
          });
          this.storageName = value.name;
          this.address = {
            street: value['street'] || '',
            city: value['city'] || '',
            neighborhood: value['neighborhood'] || '',
            state: value['state'] || '',
            zipcode: value['zipcode'] || '',
          }
        },
        error: err => {
          console.log('obs error', err)
        }
      });
    }
  }

  submit() {
    const formData = this.formGeneral.getRawValue();

    this.storageController
        .update(formData, this.storageId).subscribe({
            next: value => {
              this.router.navigate([`../`], {
                relativeTo: this.route
              });
            },
            error: err => {
              console.log('obs error', err)
              this.notify('Oops! Something went wrong');
            }
        });
  }

  private notify(message: string, action: string = '', duration: number = 6000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}
