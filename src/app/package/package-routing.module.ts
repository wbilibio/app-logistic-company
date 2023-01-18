import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageComponent } from './package.component';
import {EditPackageComponent} from "@apps/package/edit-package/edit-package.component";
import {ShippingRoutesComponent} from "@apps/package/shipping-routes/shipping-routes.component";

const routes: Routes = [
  {
    path: '',
    component: PackageComponent
  },

  {
    path: ':package',
    component: EditPackageComponent
  },
  {
    path: ':package/shipping-routes',
    component: ShippingRoutesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PackageRoutingModule {}
