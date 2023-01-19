import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PackageController} from "@api/controllers/package.controller";
import {StorageController} from "@api/controllers/storage.controller";

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {
  public storages:any;

  readonly formCreatePackage = new FormGroup({
    name: new FormControl('', Validators.required),
    storage: new FormControl('', Validators.required)
  });

  constructor(
    private ref: MatDialogRef<CreatePackageComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private packageController: PackageController,

    private storageController: StorageController
  ) {}

  ngOnInit(): void {
    this.getStorageList();
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

  createPackage() {
    let body = {
      name: this.formCreatePackage.get('name')?.value
    };
    /** send data */
    let responseAPI$ = this.packageController.save(body);
    responseAPI$.subscribe({
      next: value => {
        if(value.package_id) {
          this.associateStorage(value.package_id);
        }
      },
      error: err => {
        console.log('obs error', err)
        this.ref.close('error');
      }
    });
  }

  associateStorage(package_id: string){
    let body = {
      storage_location_id: this.formCreatePackage.get('storage')?.value
    };
    let responseAPI$ = this.packageController.associateStorage(body, package_id);
    responseAPI$.subscribe({
      next: value => {
        if(value?.status === 400){
          this.ref.close(value.response.message);
        } else {
          this.ref.close('success');
        }
      },
      error: err => {
        console.log('obs error', err)
        this.ref.close('error');
      }
    });
    this.formCreatePackage.disable();
  }
  close(){
    this.ref.close();
  }

}
