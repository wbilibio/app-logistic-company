import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageComponent } from './storage.component';
import {StorageRoutingModule} from "./storage-routing.module";
import {ContentToolbarModule} from "@apps/shared/content-toolbar/content-toolbar.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {CreateStorageComponent} from "@apps/storage/create-storage/create-storage.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {EditStorageComponent} from "@apps/storage/edit-storage/edit-storage.component";
import {GoogleMapModule} from "@apps/shared/google-components/google-map.module";

@NgModule({
  declarations: [
    StorageComponent,
    CreateStorageComponent,
    EditStorageComponent
  ],
    imports: [
        CommonModule,
        StorageRoutingModule,
        ContentToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        GoogleMapModule
    ],
  bootstrap: [StorageComponent]
})
export class StorageModule { }

