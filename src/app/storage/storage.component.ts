import {Component, OnInit, ViewChild} from '@angular/core';
import {StorageController} from "@api/controllers/storage.controller";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import {CreateStorageComponent} from "@apps/storage/create-storage/create-storage.component";

@Component({
  selector: 'storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'List storage locations';

  public dataSource = new MatTableDataSource([]);

  public displayedColumns: string[] = ['id', 'name', 'actions'];

  public isLoadingResults = false;

  constructor(
      private storageController: StorageController,
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
      this.storageController.list().subscribe({
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

  deleteStorage(storageId: string){
    this.isLoadingResults = true;
    let deleted$ = this.storageController.delete(storageId);
    deleted$.subscribe({
      next: value => {
        this.updateList();
        this.isLoadingResults = false;
        this.notify('Storage successfully deleted!');
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  openCreateDialog() {
    const ref = this.dialog.open(CreateStorageComponent, {
      disableClose: true,
      height: '400px',
      width: '600px',
    });
    ref.afterClosed().subscribe(response => {
      if (response === 'success') {
        this.updateList();
        this.notify('Storage successfully created!');
      } else if(response === 'error') {
        this.notify('Oops! Something went wrong');
      } else if(response) {
        this.notify('🔔 ' + response,'',4000);
      }
    });
  }

  private notify(message: string, action: string = '', duration: number = 2000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}


