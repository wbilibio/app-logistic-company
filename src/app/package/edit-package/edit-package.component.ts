import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageController} from "@api/controllers/package.controller";
import {StorageController} from "@api/controllers/storage.controller";
import {PackageTransactionController} from "@api/controllers/package-transaction.controller";

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {
  public packageName: string = '';
  public storages:any;

  public isLoading = true;

  public packageId: string = this.route.snapshot.params['package'];
  public transactions: any[] = [];
  public storage: any = {};

  public listStatus = [
    'waiting-withdrawal','sent','in-transit','delivered'
  ]

  public formGeneral = this.fb.group({
    name: new FormControl('', Validators.required),
    storage: new FormControl('', Validators.required),
    status: new FormControl({value: '', disabled: false}, Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    readonly router: Router,
    private packageController: PackageController,
    private route: ActivatedRoute,
    private storageController: StorageController,
    private packageTransactionController: PackageTransactionController
  ) {}

  ngOnInit() {
    this.getStorageList();
    this.getPackage();

    this.isLoading = false;
  }

  getStorageList(){
    this.storageController.list().subscribe({
      next: value => {
        if (value?.list.length) {
          this.storages = value.list;
        }
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  getPackage() {
    if(this.packageId){
      let get$ = this.packageController.get(this.packageId);
      get$.subscribe({
        next: value => {
          this.transactions = value.transactions?.length ? value.transactions : []
          this.storage = value.storage_location ?? '';
          console.log(this.storage);
          let status = this.transactions.length ? this.transactions[0].status : '';
          if(!this.transactions.length) {
            this.formGeneral.get('status')?.disable();
          }

          this.formGeneral.patchValue({
            name: value.name,
            storage: value.storage_location?.id ?? '',
            status: status
          });
          this.packageName = value.name;

        },
        error: err => {
          console.log('obs error', err)
        }
      });
    }
  }

  submit() {
    const formData = this.formGeneral.getRawValue();
    this.packageController
        .update(formData, this.packageId).subscribe({
            next: value => {
              if(this.storage.id !== this.formGeneral.get('storage')?.value) {
                console.log('associateStorage');
                this.associateStorage();
              } else {
                if(this.transactions.length){
                  console.log('with storage');
                  this.updateStatus()
                }
              }
            },
            error: err => {
              console.log('obs error', err)
            }
        });
  }
  associateStorage(){
    let body = {
      storage_location_id: this.formGeneral.get('storage')?.value
    };
    let responseAPI$ = this.packageController.associateStorage(body, this.packageId);
    responseAPI$.subscribe({
      next: value => {
        if(this.transactions.length){
          console.log('update status');
          this.updateStatus()
        } else {
/*          this.router.navigate([`../`], {
            relativeTo: this.route
          });*/
        }

      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  updateStatus(){
      let id = this.transactions[0].id;
      let body = {
        status: this.formGeneral.get('status')?.value
      };
      let responseAPI$ = this.packageTransactionController.update(body, id);
      responseAPI$.subscribe({
        next: value => {
          this.router.navigate([`../`], {
            relativeTo: this.route
          });
        },
        error: err => {
          console.log('obs error', err)
        }
      });
  }
  private notify(message: string, action: string = '', duration: number = 2000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}
