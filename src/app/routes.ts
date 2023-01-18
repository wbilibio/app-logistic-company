import { Routes } from '@angular/router';
import {AppLayoutComponent} from "./shared/app-layout";

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'storages',
        loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule)
      },
      {
        path: 'packages',
        loadChildren: () => import('./package/package.module').then(m => m.PackageModule)
      },
    ]
  }
];
