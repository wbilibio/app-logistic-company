import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentToolbarComponent } from './content-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  declarations: [ContentToolbarComponent],
  exports: [ContentToolbarComponent]
})
export class ContentToolbarModule {}
