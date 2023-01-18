import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageComponent } from './storage.component';
import {EditStorageComponent} from "@apps/storage/edit-storage/edit-storage.component";

const routes: Routes = [
  {
    path: '',
    component: StorageComponent
  },

  {
    path: ':storage',
    component: EditStorageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StorageRoutingModule {}
