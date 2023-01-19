import {Component, OnInit, ViewChild} from '@angular/core';
import {PackageController} from "@api/controllers/package.controller";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import {CreatePackageComponent} from "@apps/package/create-package/create-package.component";

@Component({
  selector: 'package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'List packages';

  public dataSource = new MatTableDataSource([]);

  public displayedColumns: string[] = ['id', 'name', 'status', 'actions'];

  public isLoadingResults = false;

  constructor(
      private packageController: PackageController,
      public snackBar: MatSnackBar,
      readonly dialog: MatDialog,
  ) { }

  ngOnInit(){
    this.isLoadingResults = true;
    this.updateList();
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this.dataSource.sort = this.sort;
    }
  }

  updateList(){
      this.packageController.list().subscribe({
        next: value => {
          if (value?.list.length) {
            this.dataSource = new MatTableDataSource(value.list);
          } else {
            this.dataSource = new MatTableDataSource([]);
          }
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoadingResults = false;
        },
        error: err => {
          console.log('obs error', err)
          this.isLoadingResults = false;
          this.notify('Oops! Something went wrong');
        }
      });
  }

  deletePackage(packageId: string){
    this.isLoadingResults = true;
    let deleted$ = this.packageController.delete(packageId);
    deleted$.subscribe({
      next: value => {
        this.updateList();
        this.isLoadingResults = false;
        this.notify('Package successfully deleted!');
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  openCreateDialog() {
    const ref = this.dialog.open(CreatePackageComponent, {
      disableClose: true,
      height: '400px',
      width: '600px',
    });
    ref.afterClosed().subscribe(response => {
      if (response === 'success') {
        this.notify('Package successfully created!');
      } else if(response === 'error') {
        this.notify('Oops! Something went wrong');
      } else if(response) {
        this.notify('🔔 ' + response,'',4000);
      }
      this.updateList();
    });
  }

  private notify(message: string, action: string = '', duration: number = 2000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}


