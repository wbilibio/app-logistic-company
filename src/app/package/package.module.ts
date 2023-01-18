import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageComponent } from './package.component';
import {PackageRoutingModule} from "./package-routing.module";
import {ContentToolbarModule} from "@apps/shared/content-toolbar/content-toolbar.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {CreatePackageComponent} from "@apps/package/create-package/create-package.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {EditPackageComponent} from "@apps/package/edit-package/edit-package.component";
import {MatSelectModule} from "@angular/material/select";
import {ShippingRoutesComponent} from "@apps/package/shipping-routes/shipping-routes.component";
import {GoogleMapModule} from "@apps/shared/google-components/google-map.module";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    PackageComponent,
    CreatePackageComponent,
    EditPackageComponent,
    ShippingRoutesComponent
  ],
    imports: [
        CommonModule,
        PackageRoutingModule,
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
        MatSelectModule,
        GoogleMapModule,
        MatTooltipModule
    ],
  bootstrap: [PackageComponent]
})
export class PackageModule { }

