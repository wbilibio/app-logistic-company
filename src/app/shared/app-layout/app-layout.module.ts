import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppLayoutComponent } from './app-layout.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    LayoutModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {}
